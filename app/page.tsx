import Image from "next/image";
import BannerSection from "@/components/bannerSection"
import Navbar from "@/components/nav";
import { MiniNav } from "@/components/miniNav";
import { MiniMenus } from "@/components/miniMenu";
import ProductSection from "@/components/productSection";

export default function Home() {
  return (
    <>
      <Navbar/>
      <MiniNav />
      <BannerSection/>
      <div className="grid grid-cols-[.10fr_1fr]">
        <div className="w-full px-4">
          <MiniMenus />
        </div>
        <ProductSection />
      </div>
    </>
  );
}
