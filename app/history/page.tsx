"use client";
import React, { useState } from "react";
import OrderCard from "@/components/OrderCard";

const orders = [
  {
    id: 1,
    shopName: "สวนสุขใจ",
    shopImage: "https://bundui-images.netlify.app/products/04.jpeg",
    shippingAddress: "ปทุมธานี, รังสิต",
    recipientName: "นายธนธรรม ทองมั่น",
    status: "สำเร็จ",
    totalPrice: 2647,
    items: ["สินค้า A", "สินค้า B", "สินค้า C"],
  },
  {
    id: 2,
    shopName: "ฟาร์มบ้านไร่",
    shopImage: "https://bundui-images.netlify.app/products/04.jpeg",
    shippingAddress: "เชียงใหม่, เมือง",
    recipientName: "นางสาวสมใจ ดีใจ",
    status: "ที่ต้องได้รับ",
    totalPrice: 1324,
    items: ["สินค้า A", "สินค้า B"],
  },
  {
    id: 3,
    shopName: "ตลาดสดห้วยขวาง",
    shopImage: "https://bundui-images.netlify.app/products/04.jpeg",
    shippingAddress: "กรุงเทพฯ, ดินแดง",
    recipientName: "นายสมชาย พอเพียง",
    status: "ที่ต้องจัดส่ง",
    totalPrice: 724,
    items: ["สินค้า A"],
  },
  {
    id: 4,
    shopName: "เกษตรอินทรีย์",
    shopImage: "https://bundui-images.netlify.app/products/04.jpeg",
    shippingAddress: "ขอนแก่น, เมือง",
    recipientName: "นางสาวสุภาพร ใจดี",
    status: "ยกเลิก/ขอคืนเงิน",
    totalPrice: 2500,
    items: ["สินค้า A", "สินค้า B", "สินค้า C", "สินค้า D"],
  },
];

const tabs = ["ทั้งหมด", "ที่ต้องจัดส่ง", "ที่ต้องได้รับ", "สำเร็จ", "ยกเลิก/ขอคืนเงิน"];

const HistoryPage = () => {
  const [selectedTab, setSelectedTab] = useState("ทั้งหมด");

  // กรองข้อมูลตามสถานะ
  const filteredOrders =
    selectedTab === "ทั้งหมด" ? orders : orders.filter((order) => order.status === selectedTab);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ประวัติการสั่งซื้อ</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === tab ? "bg-green-500 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order.id} {...order} />)
        ) : (
          <p className="text-gray-500 text-center">ไม่มีคำสั่งซื้อในหมวดหมู่นี้</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
