-- ─────────────────────────────────────────────
-- GSEEK: 공개 FAQ + 회원 1:1 질문
-- ─────────────────────────────────────────────

-- 1) 공개 FAQ — 누구나 읽을 수 있고, 운영자만 대시보드에서 작성합니다.
create table public.faqs (
  id          bigint generated always as identity primary key,
  category    text   not null,
  question    text   not null,
  answer      text   not null,
  sort_order  int    not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now()
);

-- 2) 회원 질문 — 로그인한 회원이 남기고, 본인 것만 볼 수 있습니다.
create table public.questions (
  id          bigint generated always as identity primary key,
  user_id     uuid   not null default auth.uid() references auth.users (id) on delete cascade,
  content     text   not null check (char_length(content) between 5 and 1000),
  answer      text,
  answered_at timestamptz,
  created_at  timestamptz not null default now()
);

create index questions_user_id_idx on public.questions (user_id);

-- ─────────────────────────────────────────────
-- 보안 규칙 (RLS)
-- RLS를 켜면 "정책으로 허용한 것만" 가능해집니다.
-- 운영자는 Supabase 대시보드(service role)로 접근하므로 정책의 영향을 받지 않습니다.
-- ─────────────────────────────────────────────
alter table public.faqs      enable row level security;
alter table public.questions enable row level security;

-- FAQ: 공개된 항목은 로그인 여부와 상관없이 누구나 조회
create policy "누구나 공개 FAQ 조회"
  on public.faqs for select
  to anon, authenticated
  using (is_published);

-- 질문: 본인이 쓴 질문만 조회
create policy "본인 질문만 조회"
  on public.questions for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- 질문: 본인 이름으로만 작성
create policy "본인 이름으로만 질문 작성"
  on public.questions for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

-- 질문: 아직 답변이 없는 본인 질문만 삭제
create policy "답변 전 본인 질문 삭제"
  on public.questions for delete
  to authenticated
  using ((select auth.uid()) = user_id and answer is null);

-- 회원은 answer 컬럼을 직접 바꿀 수 없도록 update 정책은 만들지 않습니다.

-- ─────────────────────────────────────────────
-- FAQ 예시 데이터
-- ─────────────────────────────────────────────
insert into public.faqs (category, question, answer, sort_order) values
  ('강의', 'GSEEK은 어떤 강의인가요?',
   'AI(Claude)로 만든 홈페이지에 회원가입·로그인·데이터베이스를 붙이고, 실제 주소로 배포해 운영하는 과정까지 다루는 실습 강의입니다.', 10),
  ('강의', '코딩을 몰라도 들을 수 있나요?',
   '네. 코드는 Claude에게 요구사항을 전달해 받아오고, 강의에서는 받은 코드에 접속 정보를 연결하고 배포하는 흐름에 집중합니다.', 20),
  ('강의', '화면만 있는 사이트와 실제 서비스는 뭐가 다른가요?',
   '화면만 있는 사이트는 버튼을 눌러도 아무 일도 일어나지 않습니다. 실제 서비스는 회원 정보와 데이터가 데이터베이스에 저장되고, 사람마다 다른 내용을 보여주며, 인터넷 주소로 누구나 접속할 수 있습니다.', 30),
  ('로그인', '회원가입했는데 로그인이 안 돼요.',
   '가입한 이메일함에서 인증 메일의 링크를 먼저 눌러야 로그인할 수 있습니다. 메일이 안 보이면 스팸함도 확인해 주세요.', 40),
  ('로그인', '인증 메일 링크를 눌렀는데 오류 페이지가 떠요.',
   'Supabase 대시보드 → Authentication → URL Configuration에서 Site URL과 Redirect URLs에 내 사이트 주소(예: https://내주소.vercel.app/**)가 등록되어 있는지 확인하세요. 또한 가입한 브라우저와 같은 브라우저에서 링크를 열어야 합니다.', 50),
  ('로그인', '"Invalid API key" 오류가 나요.',
   '환경변수의 Supabase URL이나 키에 오타·공백이 없는지 확인하세요. Vercel에 환경변수를 추가했다면 반드시 다시 배포(Redeploy)해야 적용됩니다.', 60),
  ('데이터베이스', '로그인은 되는데 데이터가 비어 보여요.',
   '대부분 보안 규칙(RLS) 때문입니다. RLS를 켜고 정책을 만들지 않으면 아무 데이터도 조회되지 않습니다. 테이블마다 필요한 정책이 있는지 확인하세요.', 70),
  ('배포', '코드를 고쳤는데 사이트에 반영되지 않아요.',
   'GitHub에 push했는지 확인하세요. Vercel은 GitHub에 새 커밋이 올라오면 자동으로 다시 배포합니다. Vercel 대시보드의 Deployments에서 진행 상태와 오류 로그를 볼 수 있습니다.', 80);
