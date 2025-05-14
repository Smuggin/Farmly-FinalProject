import ProductCard from "@/components/products/productCard";


type Product = {
  id: number;
  name: string;
  images: {
    id: number;
    url: string;
  }[];
  price: number;
  category: {
    name: string;
  };
  store: {
    name: string;
  };
  href?: string;
};

interface ProductSectionProps {
  products: Product[];
}

export default function ProductSection({ products }: ProductSectionProps) {
  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={{
            ...product,
            image: product.images?.[0]?.url ?? null, // 👈 ใช้รูปแรกเป็นภาพหลัก
            href: product.href ?? `/product/${product.id}`,
          }}
        />
      ))}
    </>
  );
}
