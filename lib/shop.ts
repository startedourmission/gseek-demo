// supabase/migrations 의 products 테이블과 같은 모양
export type Product = {
  id: number;
  name: string;
  brand: string;
  category: Category;
  price: number;
  discount: number;
  rating: number;
  review_count: number;
  rank: number;
  color_count: number;
  badge: string;
  created_at: string;
};

export const CATEGORIES = ["주방", "욕실", "수납", "패브릭"] as const;
export type Category = (typeof CATEGORIES)[number];

export const COLORS = ["내추럴", "그레이", "차콜"];

export const SORTS = ["추천순", "최신순", "높은 할인율순", "낮은 가격순"] as const;
export type Sort = (typeof SORTS)[number];

export const OFF_RANGES = [
  { label: "10~20%", min: 10, max: 20 },
  { label: "21~30%", min: 21, max: 30 },
  { label: "31% 이상", min: 31, max: 100 },
];

export const PRICE_RANGES = [
  { label: "2만 원 미만", min: 0, max: 19999 },
  { label: "2만~4만 원", min: 20000, max: 40000 },
  { label: "4만 원 이상", min: 40001, max: Infinity },
];

export const FREE_SHIPPING_MIN = 50000;
export const SHIPPING_FEE = 3000;

// 화면 옵션: 상품 목록 열 수, 상단 무료배송 띠 표시
export const GRID_COLUMNS: 3 | 2 = 3;
export const SHOW_SHIP_BAR = true;

export const won = (n: number) => n.toLocaleString("ko-KR") + "원";

// 할인가는 100원 단위로 반올림
export const salePrice = (p: Product) => Math.round((p.price * (100 - p.discount)) / 100 / 100) * 100;

export const isCategory = (v: string | undefined): v is Category =>
  CATEGORIES.includes(v as Category);
