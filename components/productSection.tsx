import ProductCard from "@/components/products/productCard";
import BenefitsSection from "./sections/benefitsSection";

type Product = {
  id: number;
  name: string;
  image?: string | null;
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
        product={{ ...product, href: `/product/${product.id}` }}
      />
    ))}
    </>
  );
}
