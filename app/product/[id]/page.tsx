import ProductDetail from "@/components/products/productDetail";
import Navbar from "@/components/nav";
import { MiniNav } from "@/components/miniNav";

export default async function ProductPage(
  props: Promise<{ params: { id: string } }>
) {
   const { params } = await props;
   const id = params.id;
  
  return (
    <div className="mx-auto max-w-7xl">
      <Navbar />
      <MiniNav />
      <ProductDetail id={id} />
    </div>
  );
}
