# GSEEK — 회원제 홈페이지 실습 예제

AI(Claude)로 만든 홈페이지에 **회원가입 · 로그인 · 데이터베이스 · 배포**를 붙여 실제로 운영되는 서비스로 만드는 강의용 예제입니다.

| 페이지 | 누가 볼 수 있나 | 하는 일 |
|---|---|---|
| `/` 소개 | 누구나 | 서비스 소개 |
| `/faq` FAQ | 누구나 | DB(`faqs`)에서 공개 FAQ 불러오기 |
| `/signup` · `/login` | 누구나 | Supabase 이메일 인증 |
| `/member` 내 질문 | 로그인한 회원 | 1:1 질문 작성, **내 질문만** 조회(RLS) |

> 비교용: `docs/static-version.html`은 화면만 있는 버전입니다. 버튼을 눌러도 아무 일도 일어나지 않아요.

---

## 1. Supabase 준비 (CLI)

```bash
npx supabase login                     # 브라우저에서 로그인
npx supabase projects create gseek     # 프로젝트 생성 (조직 · 리전 · DB 비밀번호 입력)
npx supabase link --project-ref <프로젝트ID>
npx supabase db push                   # supabase/migrations 의 테이블 · RLS · FAQ 데이터 적용
npx supabase projects api-keys --project-ref <프로젝트ID>   # 연결 키 확인
```

> 대시보드로 해도 됩니다: New project → SQL Editor에 `supabase/migrations/*.sql` 붙여넣고 실행 → Project Settings → API에서 URL · 키 복사

## 2. 접속 정보 넣기

`.env.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://<프로젝트ID>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

## 3. 로컬 실행

```bash
npm install
npm run dev   # http://localhost:3000
```

## 4. 배포 (GitHub → Vercel)

```bash
# GitHub 저장소 만들고 올리기
gh repo create gseek-demo --private --source . --push

# Vercel 프로젝트 만들고 GitHub와 연결 (이후 push하면 자동 배포)
npx vercel login
npx vercel link --yes --project gseek-demo
npx vercel git connect

# 환경변수 등록 (production / preview / development 각각)
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production

# 첫 배포
npx vercel deploy --prod
```

> 대시보드로 해도 됩니다: Vercel → Add New Project → 저장소 선택 → Environment Variables 입력 → Deploy

### 배포 후 꼭: Supabase에 내 주소 등록

인증 메일의 링크가 돌아올 주소입니다. 빠뜨리면 링크를 눌렀을 때 localhost로 가서 실패합니다.

`supabase/config.toml`의 `[auth]`를 고친 뒤 `npx supabase config push`

```toml
site_url = "https://gseek-demo.vercel.app"
additional_redirect_urls = ["https://gseek-demo.vercel.app/**", "http://localhost:3000/**"]
```

> ⚠️ `config push`는 config.toml의 값으로 원격 설정을 덮어씁니다. 실행하면 바뀌는 항목을 먼저 보여주니, **주소 외에 다른 항목이 바뀌지 않는지** 확인하고 `y`를 누르세요. (기본 config.toml은 이메일 인증이 꺼져 있습니다: `[auth.email] enable_confirmations`)
>
> 대시보드: Authentication → URL Configuration

이후에는 GitHub에 push할 때마다 Vercel이 자동으로 다시 배포합니다.

## 5. 운영하기

- **질문에 답변하기:** Supabase → Table Editor → `questions` → `answer`, `answered_at` 입력
- **FAQ 추가:** `faqs` 테이블에 행 추가 (`is_published = false`면 숨김)
- **RLS 확인 실습:** 계정 두 개로 질문을 남긴 뒤, `questions`의 RLS를 잠깐 끄면 남의 질문까지 보이는 것을 확인 → 다시 켜기

## 로그인 오류 점검표

| 증상 | 확인할 것 |
|---|---|
| 가입했는데 로그인 안 됨 | 인증 메일 링크를 눌렀는지 (스팸함 포함) |
| 인증 링크 누르면 오류 | Redirect URLs에 내 주소 등록 여부, 가입한 브라우저에서 열었는지 |
| `Invalid API key` | 환경변수 오타 · 공백, Vercel 환경변수 변경 후 **Redeploy** 했는지 |
| 로그인은 되는데 데이터가 비어 있음 | RLS 정책이 있는지 |
| 인증 메일이 안 옴 | Supabase 기본 메일은 시간당 발송 제한이 있음 → 잠시 후 재시도 |
| push했는데 Vercel 배포가 **Blocked** | 커밋 작성자 이메일이 GitHub 계정과 연결되지 않음 → `git config user.email "<GitHub에 등록된 이메일>"` 설정 후 다시 커밋 · push |

## 폴더 구조

```
app/
  page.tsx            소개
  faq/page.tsx        FAQ (DB 조회)
  login/ signup/      인증 페이지
  member/page.tsx     회원 전용 — 내 질문
  auth/callback/      인증 메일 링크가 돌아오는 곳
  actions/            서버 액션 (가입 · 로그인 · 질문)
components/           리본 · 스티커 · 내비게이션 · 폼
lib/supabase/         Supabase 클라이언트
proxy.ts              세션 갱신 + /member 보호
supabase/migrations/  테이블 · RLS · FAQ 예시 데이터
docs/prompts.md       Claude 요구사항 프롬프트 예시
```
