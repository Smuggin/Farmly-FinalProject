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
    <div className="grid grid-cols-4 mx-auto gap-6 mt-4">
      <div className="col-span-4">สินค้าทั้งหมด</div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={{ ...product, href: `/products/${product.id}` }}
        />
      ))}
    </div>
  );
}
