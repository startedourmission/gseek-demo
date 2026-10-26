import Shelf from "@/components/Shelf";
import { getProducts } from "@/lib/products";
import { isCategory } from "@/lib/shop";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { cat } = await searchParams;
  return <Shelf products={await getProducts()} cat={typeof cat === "string" && isCategory(cat) ? cat : null} />;
}
