"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CATEGORIES, SHOW_SHIP_BAR } from "@/lib/shop";
import { cartCount, setQuery, useQuery, useShop } from "@/lib/store";

const NAV = [...CATEGORIES.map((c) => ({ label: c, href: `/?cat=${c}`, cat: c as string })), { label: "세일", href: "/", cat: "" }];

function CategoryNav() {
  const pathname = usePathname();
  const cat = useSearchParams().get("cat") ?? "";
  return <NavLinks active={pathname === "/" ? cat : null} />;
}

function NavLinks({ active }: { active: string | null }) {
  return (
    <nav className="gnb">
      {NAV.map((n) => (
        <Link key={n.label} href={n.href} aria-current={active === n.cat ? "page" : undefined}>
          {n.label}
        </Link>
      ))}
    </nav>
  );
}

function SearchBox() {
  const query = useQuery();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <label className="search">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (pathname !== "/") router.push("/");
        }}
        placeholder="검색"
        aria-label="상품 검색"
      />
    </label>
  );
}

export default function Header() {
  const { cart } = useShop();
  return (
    <>
      <div className="util">
        <span>고객센터</span>
        <span>|</span>
        <span>가입하기</span>
        <span>|</span>
        <span>로그인</span>
      </div>
      <header className="header">
        <div className="header__in">
          <Link href="/" className="logo">
            MONO
          </Link>
          <Suspense fallback={<NavLinks active={null} />}>
            <CategoryNav />
          </Suspense>
          <div className="header__tools">
            <SearchBox />
            <Link href="/cart" className="bag" aria-label="장바구니">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
                <path d="M5 8h14l-1 12H6L5 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span className="bag__count">{cartCount(cart)}</span>
            </Link>
          </div>
        </div>
      </header>
      {SHOW_SHIP_BAR && (
        <div className="shipbar">
          <strong>5만 원 이상 구매 시 무료배송</strong>
          <span>자세히 보기</span>
        </div>
      )}
    </>
  );
}
