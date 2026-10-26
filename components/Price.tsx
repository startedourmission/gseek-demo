import { salePrice, won, type Product } from "@/lib/shop";

// 할인가 · 정가(취소선) · 할인율. inlineOff면 할인율을 같은 줄에 붙인다
export default function Price({ product: p, inlineOff = false }: { product: Product; inlineOff?: boolean }) {
  return (
    <span className="price">
      <span className="price__sale">{won(salePrice(p))}</span>
      {p.discount > 0 && <span className="price__old">{won(p.price)}</span>}
      {inlineOff && p.discount > 0 && <span className="price__off">{p.discount}% 할인</span>}
    </span>
  );
}
