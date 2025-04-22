"use client";

import React, { useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard";

const tabs = ["ทั้งหมด", "ที่ต้องจัดส่ง", "ที่ต้องได้รับ", "สำเร็จ", "ยกเลิก/ขอคืนเงิน"];

const HistoryPage = () => {
  const [selectedTab, setSelectedTab] = useState("ทั้งหมด");
  const [orders, setOrders] = useState<
  {
    id: number;
    shopName: string;
    shopImage: string;
    shippingAddress: string;
    recipientName: string;
    status: string;
    totalPrice: number;
    items: {
      product: {
        name: string;
        image?: string;
        store?: {
          name: string;
        };
      };
      quantity: number;
      price: number;
    }[];
  }[]
>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();
      console.log("📦 orders from API:", data);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const filteredOrders =
    selectedTab === "ทั้งหมด" ? orders : orders.filter((order) => order.status === selectedTab);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ประวัติการสั่งซื้อ</h1>

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
