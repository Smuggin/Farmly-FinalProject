
import BannerSection from "@/components/bannerSection";
import Navbar from "@/components/nav";
import { MiniNav } from "@/components/miniNav";
import MiniMenus from "@/components/miniMenu";
import ProductSection from "@/components/productSection";
import BenefitsSection from "@/components/sections/benefitsSection";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categories = await prisma.category.findMany();

  const products = await prisma.product.findMany({
    where: searchParams.category
      ? { category: { name: searchParams.category } }
      : undefined,
    include: {
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
          <ProductSection
            products={products.map((product) => ({
              ...product,
              coverImage: product.coverImage ?? "",
            }))}
          />
        </div>
        <BenefitsSection />
      </div>
    </div>
  );
}
