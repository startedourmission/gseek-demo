-- ─────────────────────────────────────────────
-- MONO: 상품 목록
-- ─────────────────────────────────────────────
create table public.products (
  id            bigint generated always as identity primary key,
  name          text    not null,
  brand         text    not null,
  category      text    not null check (category in ('주방', '욕실', '수납', '패브릭')),
  price         int     not null check (price > 0),           -- 정가 (원)
  discount      int     not null default 0 check (discount between 0 and 100),  -- 할인율 (%)
  rating        numeric(2, 1) not null default 0,
  review_count  int     not null default 0,
  rank          int     not null default 0,                    -- 추천순 (작을수록 앞)
  color_count   int     not null default 1,
  badge         text    not null default '',                   -- 베스트셀러 · 신제품 · 한정 수량
  is_published  boolean not null default true,
  created_at    timestamptz not null default now()             -- 최신순
);

-- ─────────────────────────────────────────────
-- 보안 규칙 (RLS)
-- 상품은 누구나 볼 수 있고, 추가 · 수정은 운영자가 대시보드에서만 합니다.
-- ─────────────────────────────────────────────
alter table public.products enable row level security;

create policy "누구나 공개 상품 조회"
  on public.products for select
  to anon, authenticated
  using (is_published);

-- ─────────────────────────────────────────────
-- 상품 예시 데이터
-- ─────────────────────────────────────────────
insert into public.products (name, brand, category, price, discount, rating, review_count, rank, color_count, badge, created_at) values
  ('스테인리스 밀폐용기 3종 세트', '키친랩',     '주방',   39000, 30, 4.8, 1240, 1, 3, '베스트셀러', now() - interval '4 days'),
  ('원목 도마 라지',               '우드앤',     '주방',   28000, 20, 4.7,  532, 3, 2, '',           now() - interval '6 days'),
  ('호텔식 샤워 타월 2매',         '코튼데이',   '욕실',   24000, 10, 4.6,  880, 2, 5, '신제품',     now() - interval '2 days'),
  ('규조토 발매트',                '드라이',     '욕실',   19000, 40, 4.5,  310, 6, 2, '한정 수량',  now() - interval '7 days'),
  ('접이식 수납 박스 M',           '박스랩',     '수납',   15000, 25, 4.4,  765, 4, 4, '',           now() - interval '3 days'),
  ('스택형 서랍장 3단',            '박스랩',     '수납',   69000, 15, 4.7,  198, 7, 2, '신제품',     now() - interval '1 days'),
  ('워싱 린넨 쿠션 커버',          '린넨하우스', '패브릭', 22000, 10, 4.6,  421, 5, 6, '',           now() - interval '5 days'),
  ('사계절 극세사 블랭킷',         '코튼데이',   '패브릭', 45000, 35, 4.9, 2033, 8, 3, '베스트셀러', now()),
  ('유리 오일 디스펜서',           '키친랩',     '주방',   12000, 20, 4.3,  144, 9, 1, '',           now() - interval '8 days');
