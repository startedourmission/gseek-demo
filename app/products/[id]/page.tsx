import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getProduct } from "@/lib/products";

export async function generateMetadata({ params }: PageProps<"/products/[id]">): Promise<Metadata> {
  const p = await getProduct(Number((await params).id));
  return { title: p ? `${p.name} | MONO` : "MONO" };
}

export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const p = await getProduct(Number((await params).id));
  if (!p) notFound();
  return <ProductDetail key={p.id} product={p} />;
}
