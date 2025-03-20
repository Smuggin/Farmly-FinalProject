import Navbar from "@/components/nav";
import { MiniNav } from "@/components/miniNav";
import AddressList from "@/components/addressList";
import CartList from "@/components/cartList";
import SummarySection from "@/components/summarySection";

export default function Cart(){
    return (
        <>
        <div className="mx-auto max-w-7xl">
            <Navbar/>
            <MiniNav />
            <div className="px-8">
                <h1 className="text-5xl font-bold">
                ที่อยู่จัดส่ง
                </h1>
                <AddressList />
                <h2 className="text-3xl font-bold my-4">
                    ตระกร้าสินค้า
                </h2>
                <CartList />
                <SummarySection />
            </div>
        </div>
        </>
    );
}