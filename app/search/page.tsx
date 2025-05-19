import { notFound } from "next/navigation";
import MiniMenus from "@/components/miniMenu";
import ProductSection from "@/components/productSection";
import BenefitsSection from "@/components/sections/benefitsSection";
import BannerSection from "@/components/bannerSection";
import Navbar from "@/components/nav";
import { MiniNav } from "@/components/miniNav";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";

  if (!query) return <p className="p-4">กรุณากรอกคำค้นหา</p>;

  const categories = await prisma.category.findMany();

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      images: true,
      category: true,
      store: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (products.length === 0) return <p className="p-4">ไม่พบสินค้า</p>;

  return (
    <div className="mx-auto max-w-7xl">
      <Navbar />
      <MiniNav />
      <BannerSection />
      <div className="grid grid-cols-[.15fr_.9fr]">
        <div className="w-full pl-4">
          <MiniMenus categories={categories} />
        </div>
        <div className="grid grid-cols-4 mx-auto gap-6 mt-4">
          <ProductSection products={products} />
        </div>
        <BenefitsSection />
      </div>
    </div>
  );
}
