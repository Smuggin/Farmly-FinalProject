"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: {
    name: string;
    href: string;
    image: string;
    price: number;
    category: {
      name: string;
    };
    store: {
      name: string;
    };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const placeholderImage = "https://bundui-images.netlify.app/products/04.jpeg";
  const { addItem } = useCart();

  return (
    <Card className="w-[225px] group relative overflow-hidden gap-4">
      <figure className="group-hover:opacity-90 relative">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black"
        >
          <HeartIcon className="size-4" />
        </Button>
        <Link href={product.href}>
          <div className="relative w-[225px] h-[200px] overflow-hidden rounded-t-md">
            <Image
              src={product.image || placeholderImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </figure>
      <CardContent className="px-4 py-0">
        <div className="flex justify-between">
          <div>
            {/* Make the h3 relative to contain the absolute overlay span */}
            <h3 className="leading-2 text-sm font-medium text-green-600 relative">
              {product.store.name}
            </h3>
            <h3 className="text-lg font-medium relative">
              <Link href={product.href}>
                {/* This span covers only the h3 area, so clicks outside won't trigger navigation */}
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">
              {product.category.name}
            </p>
          </div>
          <p className="text-lg font-semibold">฿{product.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-0 border-t">
        {/* <Button
          variant="ghost"
          className="w-full"
          onClick={() => addItem(product)}
        >
          <PlusIcon className="size-4 me-1" /> Add to Cart
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
