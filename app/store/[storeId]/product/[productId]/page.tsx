import ProductDetail from "@/components/products/productDetail";
import Navbar from "@/components/nav";
import { MiniNav } from "@/components/miniNav";

export default async function ProductPage({
  params,
}: {
  params: { storeId: string; productId: string };
}) {
  return (
    <div className="mx-auto max-w-7xl">
      <Navbar />
      <MiniNav />
      <ProductDetail id={params.productId} />
    </div>
  );
}
