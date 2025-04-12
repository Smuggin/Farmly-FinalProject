import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  product: {
    name: string;
    href: string;
    image?: string | null;
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

  return (
    <Card className="w-[225px] group relative space-y-4 overflow-hidden">
      <figure className="group-hover:opacity-90">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black"
        >
          <HeartIcon className="size-4" />
        </Button>
        <Image
          className="w-full object-cover"
          src={product.image || placeholderImage}
          width={225}
          height={200}
          alt={product.name}
        />
      </figure>
      <CardContent className="px-4 py-0">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">
              <Link href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">
              {product.category.name}
            </p>
            <p className="text-sm text-muted-foreground">
              ร้าน: {product.store.name}
            </p>
          </div>
          <p className="text-lg font-semibold">฿{product.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-0 border-t">
        <Button variant="ghost" className="w-full">
          <PlusIcon className="size-4 me-1" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
