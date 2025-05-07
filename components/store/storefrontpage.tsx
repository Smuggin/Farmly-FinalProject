'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star } from 'lucide-react';

export default function StorefrontPage() {
  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/store-avatar.png"
            alt="Store Avatar"
            width={96}
            height={96}
            className="rounded-full"
          />
          <h2 className="text-xl font-bold mt-4">สวนลุงดำ</h2>
          <p className="text-sm text-muted-foreground">
            220 ตำบลสันป่ายาง อำเภอแม่แตง จังหวัดเชียงใหม่ 50100
          </p>
        </div>

        <nav className="mt-6 space-y-2">
          <Button variant="default" className="w-full justify-start">
            หน้าร้านค้า
          </Button>
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

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Banner */}
        <div className="rounded-xl bg-gradient-to-r from-green-600 to-green-400 p-6 text-white relative overflow-hidden">
          <div className="z-10 relative">
            <h2 className="text-xl font-bold mb-1">เพิ่มสินค้าเข้า สวนลุงดำ!</h2>
            <p className="mb-4">เริ่มต้นการขายของคุณที่นี่</p>
            <Button className="bg-white text-green-700 hover:bg-green-100">
              + เพิ่มสินค้า
            </Button>
          </div>
          <Image
            src="/produce-banner.jpg"
            alt="Produce"
            width={300}
            height={150}
            className="absolute right-4 bottom-0 rounded-lg opacity-20"
          />
        </div>

        {/* Popular Products */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">สินค้ายอดนิยม</h3>
          <Button variant="secondary">ดูเพิ่มเติม</Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* {[...Array(8)].map((_, i) => (
            <Card key={i} className="p-2">
              <CardContent className="space-y-2">
                <div className="w-full h-32 bg-gray-200 rounded" />
                <div className="text-xs text-muted-foreground">Category</div>
                <div className="font-semibold text-sm">Product 1</div>
                <div className="flex gap-1 text-xs">
                  <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Organic</span>
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">New</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">โปรโมชัน</span>
                </div>
                <div className="text-orange-600 font-bold">฿100.00</div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))} */}
        </div>
      </main>
    </div>
  );
}
