// app/history/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard";

const tabs = ["ทั้งหมด", "ที่ต้องจัดส่ง", "ที่ต้องได้รับ", "สำเร็จ", "ยกเลิก/ขอคืนเงิน"];

const HistoryPage = () => {
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState("ทั้งหมด");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // 👈 add loading state

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(true); // start loading
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setOrders(data);
          } else {
            console.error("Invalid response from /api/orders:", data);
            setOrders([]);
          }
        })
        .catch((err) => {
          console.error("Error loading orders:", err);
          setOrders([]);
        })
        .finally(() => setLoading(false)); // stop loading
    }
  }, [status]);

  if (status === "loading") return <p>กำลังโหลด...</p>;
  if (status === "unauthenticated") return <p>กรุณาเข้าสู่ระบบก่อนดูประวัติคำสั่งซื้อ</p>;

  const filteredOrders =
    selectedTab === "ทั้งหมด" ? orders : orders.filter((order) => order.status === selectedTab);

  return (
    <div className="px-8">
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
        {loading ? (
          // 👇 Skeleton placeholders
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse border p-4 rounded-md space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/4" />
              <div className="h-3 bg-gray-300 rounded w-1/2" />
              <div className="h-3 bg-gray-300 rounded w-3/4" />
            </div>
          ))
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order.id} {...order} />)
        ) : (
          <p className="text-gray-500 text-center">ไม่มีคำสั่งซื้อในหมวดหมู่นี้</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
