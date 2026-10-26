import Link from "next/link";
import type { Product } from "@/lib/shop";
import Price from "./Price";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link href={`/products/${p.id}`} className="card">
      <div className="card__img">상품 이미지</div>
      <div className="card__body">
        {p.badge && <span className="card__badge">{p.badge}</span>}
        <span className="card__name">{p.name}</span>
        <span className="muted">
          {p.category} · {p.brand}
        </span>
        <span className="muted">{p.color_count}개 색상</span>
        <Price product={p} />
        {p.discount > 0 && <span className="price__off">{p.discount}% 할인</span>}
      </div>
    </Link>
  );
}
