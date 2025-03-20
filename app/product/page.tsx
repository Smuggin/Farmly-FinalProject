import BannerSection from "@/components/bannerSection"
import ProductDetail from "@/components/products/productDetail";
import Navbar from "@/components/nav";
import { MiniNav } from "@/components/miniNav";


export default function Product() {
    return (
        <div className="mx-auto max-w-7xl">
            <Navbar/>
            <MiniNav />
            <ProductDetail />
        </div>
    );
}