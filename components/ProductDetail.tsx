"use client";

import { useState } from "react";
import { COLORS, type Product } from "@/lib/shop";
import { addToCart, toggleWish, useShop } from "@/lib/store";
import Price from "./Price";

export default function ProductDetail({ product: p }: { product: Product }) {
  const { wish } = useShop();
  const [thumb, setThumb] = useState(0);
  const [color, setColor] = useState(COLORS[0]);
  const [toast, setToast] = useState(false);
  const wished = !!wish[p.id];

  return (
    <section className="detail">
      <div className="gallery">
        <div className="gallery__thumbs">
          {[0, 1, 2, 3].map((i) => (
            <button key={i} aria-pressed={thumb === i} aria-label={`이미지 ${i + 1}`} onClick={() => setThumb(i)} />
          ))}
        </div>
        <div className="gallery__main">
          <span>상품 이미지 {thumb + 1}</span>
        </div>
      </div>

      <div className="buy">
        <div>
          <h1>{p.name}</h1>
          <div className="buy__meta">
            {p.category} · {p.brand}
          </div>
          <Price product={p} inlineOff />
        </div>

        <div className="options">
          <div className="options__head">
            <span>색상 선택</span>
            <span>{color}</span>
          </div>
          <div className="options__list">
            {COLORS.map((c) => (
              <button key={c} aria-pressed={color === c} onClick={() => setColor(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="actions">
          <button
            className="btn btn--dark"
            onClick={() => {
              addToCart(p.id);
              setToast(true);
            }}
          >
            장바구니
          </button>
          <button className="btn btn--line" onClick={() => toggleWish(p.id)}>
            {wished ? "위시리스트에 담김" : "위시리스트"} <span>{wished ? "♥" : "♡"}</span>
          </button>
        </div>

        {toast && <div className="toast">✓ 장바구니에 담았습니다</div>}

        <p className="desc">매일 쓰기 좋은 기본 디자인입니다. 상품 설명, 소재, 사이즈 정보가 들어가는 자리입니다.</p>

        <div className="info">
          <div>
            <span>무료 배송 및 반품</span>
            <span>⌄</span>
          </div>
          <div>
            <span>리뷰 ({p.review_count.toLocaleString("ko-KR")})</span>
            <span>★ {p.rating}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
