"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

export default function ProductsDashboard() {
  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <div className="flex flex-col items-center text-center">
          {/* <Image
            src={storeImage}
            alt="Store Avatar"
            width={96}
            height={96}
            className="rounded-full"
          />
          <h2 className="text-xl font-bold mt-4">{store.name}</h2>
          <p className="text-sm text-muted-foreground">
            {store.address || "ที่อยู่ไม่ระบุ"}
          </p> */}
        </div>

        <nav className="mt-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            สินค้า
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            หมวดหมู่
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            ออเดอร์
          </Button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">สินค้า</h1>
          <Button className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" /> เพิ่มสินค้า
          </Button>
        </div>

        {/* Grid of Product Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="p-2">
                {/* <Image
                  src="https://via.placeholder.com/300x200"
                  alt="product"
                  width={300}
                  height={200}
                  className="rounded-md"
                /> */}
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-1">
                <CardTitle className="text-base">ชื่อสินค้า {i + 1}</CardTitle>
                <p className="text-sm text-gray-500">หมวดหมู่: ผัก</p>
                <p className="text-sm text-green-700 font-medium">฿100</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
