"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CATEGORIES,
  GRID_COLUMNS,
  OFF_RANGES,
  PRICE_RANGES,
  SORTS,
  salePrice,
  type Category,
  type Product,
  type Sort,
} from "@/lib/shop";
import { useQuery } from "@/lib/store";
import ProductCard from "./ProductCard";

const toggleIn = (list: number[], i: number) =>
  list.includes(i) ? list.filter((x) => x !== i) : [...list, i];

function CheckGroup({ title, options, selected, onToggle }: {
  title: string;
  options: { label: string }[];
  selected: number[];
  onToggle: (i: number) => void;
}) {
  return (
    <div className="filters__group">
      <h2>{title}</h2>
      {options.map((o, i) => (
        <button key={o.label} className="check" aria-pressed={selected.includes(i)} onClick={() => onToggle(i)}>
          <span className="check__box">✓</span>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function Shelf({ products, cat }: { products: Product[]; cat: Category | null }) {
  const query = useQuery();
  const [sort, setSort] = useState<Sort>("추천순");
  const [filterOpen, setFilterOpen] = useState(true);
  const [offs, setOffs] = useState<number[]>([]);
  const [prices, setPrices] = useState<number[]>([]);

  const list = products.filter((p) => {
    if (cat && p.category !== cat) return false;
    if (query && !(p.name + p.brand).includes(query)) return false;
    if (offs.length && !offs.some((i) => p.discount >= OFF_RANGES[i].min && p.discount <= OFF_RANGES[i].max)) return false;
    if (prices.length && !prices.some((i) => salePrice(p) >= PRICE_RANGES[i].min && salePrice(p) <= PRICE_RANGES[i].max)) return false;
    return true;
  }).sort((a, b) =>
    sort === "최신순" ? b.created_at.localeCompare(a.created_at)
    : sort === "낮은 가격순" ? salePrice(a) - salePrice(b)
    : sort === "높은 할인율순" ? b.discount - a.discount
    : a.rank - b.rank,
  );

  const title = query ? `‘${query}’ 검색 결과` : cat ? `세일 ${cat}` : "세일 상품";

  return (
    <>
      <div className="toolbar">
        <h1>
          {title} ({list.length})
        </h1>
        <div className="toolbar__right">
          <button className="filter-toggle" onClick={() => setFilterOpen((v) => !v)}>
            {filterOpen ? "필터 숨기기" : "필터 표시"}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
              <path d="M4 8h10M18 8h2M4 16h2M10 16h10" />
              <circle cx="16" cy="8" r="2" />
              <circle cx="8" cy="16" r="2" />
            </svg>
          </button>
          <label className="sort">
            <span>정렬:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="shelf">
        {filterOpen && (
          <aside className="filters">
            <div className="filters__cats">
              {[null, ...CATEGORIES].map((c) => (
                <Link key={c ?? "전체"} href={c ? `/?cat=${c}` : "/"} aria-current={c === cat ? "page" : undefined}>
                  {c ?? "전체"}
                </Link>
              ))}
            </div>
            <CheckGroup title="할인율" options={OFF_RANGES} selected={offs} onToggle={(i) => setOffs((s) => toggleIn(s, i))} />
            <CheckGroup title="가격대" options={PRICE_RANGES} selected={prices} onToggle={(i) => setPrices((s) => toggleIn(s, i))} />
          </aside>
        )}

        <div className={`grid grid--${GRID_COLUMNS}`}>
          {list.length === 0 && <div className="empty">조건에 맞는 상품이 없습니다.</div>}
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}
