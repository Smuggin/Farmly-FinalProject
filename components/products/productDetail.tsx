import { notFound } from "next/navigation";
import { Minus, Plus, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ProductDetails from "@/components/ProductDetails"; // ✅ Import component
import Image from "next/image";
import AddToCartButton from "./addtocartButton";

async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetail({ id }: { id: string }) {
  const product = await getProduct(id);
  if (!product) return notFound();
  
  return (
    <>
      <div className="grid grid-cols-[1.5fr_2fr]">
        <div className="w-[500px] rounded-md pl-7">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={product.coverImage || "/placeholder.jpg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-md"
            />
          </AspectRatio>
        </div>
        <div className="w-full">
          <h1 className="font-bold text-4xl">{product.name}</h1>

          <h3 className="text-3xl font-semibold mt-1">
            ฿ {product.price.toFixed(2)}
          </h3>
          <hr className="my-4" />
          <AddToCartButton product={product}/>
          <div className="mt-4">
            สถานะสินค้า: {product.stock > 0 ? "มีสินค้า" : "สินค้าหมด"}
          </div>
          <div className="mt-4">
            ประเภทสินค้า: {product.category?.name || "ไม่ระบุ"}
          </div>
        </div>
      </div>

      <ProductDetails
        description={product.description}
        store={{
          name: product.store?.name || "ไม่ระบุ",
          description: product.store?.description || "ไม่ระบุ",
        }}
        productId={product.id}
      />
    </>
  );
}
