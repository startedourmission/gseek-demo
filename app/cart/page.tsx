import type { Metadata } from "next";
import { connection } from "next/server";
import CartView from "@/components/CartView";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = { title: "장바구니 | MONO" };

export default async function CartPage() {
  await connection(); // 빌드할 때 고정하지 않고, 요청마다 최신 가격을 불러온다
  return <CartView products={await getProducts()} />;
}
