"use client";

import { useState } from "react";
import { FREE_SHIPPING_MIN, SHIPPING_FEE, salePrice, won, type Product } from "@/lib/shop";
import { setQty, useShop } from "@/lib/store";

export default function CartView({ products }: { products: Product[] }) {
  const { cart } = useShop();
  const [done, setDone] = useState(false);

  const items = Object.entries(cart).flatMap(([id, qty]) => {
    const p = products.find((x) => x.id === Number(id));
    return p && qty > 0 ? [{ p, qty }] : [];
  });
  const subtotal = items.reduce((t, { p, qty }) => t + salePrice(p) * qty, 0);
  const ship = subtotal >= FREE_SHIPPING_MIN || subtotal === 0 ? 0 : SHIPPING_FEE;

  return (
    <section className="cart">
      <div>
        <h1>장바구니</h1>
        {items.length === 0 && <div className="cart__empty">장바구니에 담긴 상품이 없습니다.</div>}
        {items.map(({ p, qty }) => (
          <div key={p.id} className="line">
            <div className="line__img" />
            <div className="line__body">
              <div className="line__top">
                <span>{p.name}</span>
                <span>{won(salePrice(p) * qty)}</span>
              </div>
              <span className="muted">
                {p.category} · {p.brand}
              </span>
              <span className="muted">{won(salePrice(p))}</span>
              <div className="line__actions">
                <div className="qty">
                  <button onClick={() => setQty(p.id, qty - 1)} aria-label={qty === 1 ? "삭제" : "수량 빼기"}>
                    {qty === 1 ? "×" : "−"}
                  </button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(p.id, qty + 1)} aria-label="수량 더하기">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="summary">
        <h2>주문 내역</h2>
        <div className="summary__row">
          <span>상품 금액</span>
          <span>{won(subtotal)}</span>
        </div>
        <div className="summary__row">
          <span>배송비</span>
          <span>{ship ? won(ship) : "무료"}</span>
        </div>
        {ship > 0 && <div className="summary__hint">{won(FREE_SHIPPING_MIN - subtotal)} 더 구매하면 무료배송</div>}
        <div className="summary__row summary__total">
          <span>총 결제 금액</span>
          <span>{won(subtotal + ship)}</span>
        </div>
        <button className="btn btn--dark" onClick={() => items.length && setDone(true)}>
          {done ? "주문이 완료되었습니다" : "주문결제"}
        </button>
      </aside>
    </section>
  );
}
