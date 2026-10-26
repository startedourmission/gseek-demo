# MONO — 예제 쇼핑몰

강의용 예제 쇼핑몰입니다. 실제 판매하지 않습니다.
Claude Design의 `예제 쇼핑몰 v2` 시안을 Next.js(App Router, TypeScript)로 옮기고, 상품 데이터는 Supabase에서 불러옵니다.

| 페이지 | 하는 일 |
|---|---|
| `/` | 세일 상품 목록 — 카테고리(`?cat=주방`), 검색, 할인율 · 가격대 필터, 정렬 |
| `/products/[id]` | 상품 상세 — 썸네일, 색상 선택, 장바구니 담기, 위시리스트 |
| `/cart` | 장바구니 — 수량 조절, 5만 원 이상 무료배송 계산, 주문결제 |

## 1. Supabase 준비 (CLI)

```bash
npx supabase login
npx supabase projects create mono-shop        # 조직 · 리전 · DB 비밀번호 입력
npx supabase link --project-ref <프로젝트ID>
npx supabase db push                          # products 테이블 · RLS · 예시 상품 적용
npx supabase projects api-keys --project-ref <프로젝트ID>
```

> 대시보드로 해도 됩니다: New project → SQL Editor에 `supabase/migrations/*.sql` 붙여넣고 실행 → Project Settings → API에서 URL · 키 복사

## 2. 접속 정보 넣기

```bash
cp .env.example .env.local   # URL · publishable 키 채우기
```

## 3. 로컬 실행

```bash
npm install
npm run dev   # http://localhost:3000
```

## 4. 배포 (GitHub → Vercel)

```bash
gh repo create mono-shop --private --source . --push
npx vercel link --yes
npx vercel git connect
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production
npx vercel deploy --prod
```

이후에는 GitHub에 push할 때마다 Vercel이 자동으로 다시 배포합니다.

## 5. 운영하기

- **상품 추가 · 가격 수정:** Supabase → Table Editor → `products`. 저장하면 새로고침만으로 사이트에 바로 반영됩니다.
- **상품 숨기기:** `is_published`를 `false`로
- **RLS 확인:** 누구나 상품을 볼 수는 있지만, 사이트(publishable 키)로는 상품을 추가 · 수정할 수 없습니다.

## 폴더 구조

```
app/                  페이지 (목록 · 상세 · 장바구니) · 전체 레이아웃
components/           헤더 · 상품 목록 · 상품 카드 · 상세 · 장바구니
lib/shop.ts           상품 타입 · 가격 계산 · 필터 · 화면 옵션(열 수, 무료배송 띠)
lib/products.ts       Supabase에서 상품 불러오기
lib/supabase.ts       Supabase 클라이언트
lib/store.ts          장바구니 · 위시리스트(브라우저 localStorage에 저장) · 검색어
supabase/migrations/  products 테이블 · RLS · 예시 상품
```
