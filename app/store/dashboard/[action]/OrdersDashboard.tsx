"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useStore } from "../_components/StoreContext";
import { useOrders } from "../_components/OrderContext";
import { Separator } from "@/components/ui/separator";

export default function OrdersDashboard() {
  const orders = useOrders();
  const status: Record<string, string> = {
    PENDING: 'รอการชำระเงิน',
    PROCESSING: 'กำลังดำเนินการ',
    SHIPPED: 'ถึงขนส่ง',
    DELIVERED: 'จัดส่งแล้ว',
    CANCELLED: 'ยกเลิก',
  };

  return (
    <div className="flex w-full bg-white">
      <main className="flex-1 px-3 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold align-top">ออเดอร์</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500">
            ยังไม่มีสินค้าในร้านนี้
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {orders.map((o) => (
              <Card key={o.id}>
                <CardContent className="p-4 space-y-1 h-24  ">
                  <CardTitle className="text-base">Order #{o.id} - {o.user?.name} ({o.orderItems.length} รายการ)</CardTitle>
                  {o.orderItems &&
                    o.orderItems.slice(0, 3).map((item) => (
                      <p
                        key={item.id}
                        className="text-xs ml-4 text-green-700/50 font-medium"
                      >
                        x{item.quantity} - {item.product.name}
                      </p>
                    ))}
                  {o.orderItems && o.orderItems.length > 3 && (
                    <p className="text-xs ml-4 text-gray-500/50">
                      +{o.orderItems.length - 3} more
                    </p>
                  )}
                </CardContent>
                <p className="text-sm text-gray-500 px-5">
                    {o.createdAt
                        ? new Date(o.createdAt).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        })
                        : "ไม่ทราบวันที่"} - {o.address?.street} {o.address?.city} {o.address?.state} {o.address?.country} {o.address?.postalCode}
                </p>
                <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4 text-green-700" />
                        <p className="text-sm text-gray-500">{status[o.status as keyof typeof status] ?? 'ไม่ทราบสถานะ'}</p>-
                        <span className="text-xs text-gray-500"> {o.createdAt
                        ? new Date(o.createdAt).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        }): ""} </span>
                    </div>
                    <p className="text-sm font-medium text-green-700">
                        ฿ {o.orderItems
                            .reduce((total, item) => total + item.quantity * item.product.price, 0).toFixed(2)} 
                    </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
