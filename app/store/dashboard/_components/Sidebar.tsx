'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Sidebar({
  store,
}: {
  store: {
    id: number;
    name: string;
    address?: string;
    images: { id: number; url: string }[];
  };
}) {
  const storeImage = store.images[0]?.url || "/store-avatar.png";

  return (
    <aside className="w-64 border-r p-4">
      <div className="flex flex-col items-center text-center">
        <Image
          src={storeImage}
          alt="Store Avatar"
          width={96}
          height={96}
          className="rounded-full"
        />
        <h2 className="text-xl font-bold mt-4">{store.name}</h2>
        <p className="text-sm text-muted-foreground">
          {store.address ?? "ที่อยู่ไม่ระบุ"}
        </p>
      </div>

      <nav className="mt-6 space-y-2">
        <Link href="/store/dashboard">
          <Button variant="ghost" className="w-full justify-start">
            หน้าหลัก
          </Button>
        </Link>
        <Link href="/store/dashboard/products">
          <Button variant="ghost" className="w-full justify-start">
            สินค้า
          </Button>
        </Link>
        <Link href="/store/dashboard/orders">
          <Button variant="ghost" className="w-full justify-start">
            ออเดอร์
          </Button>
        </Link>
        <Link href="../../">
          <Button variant="ghost" className="w-full justify-start">
            กลับไปหน้าซื้อสินค้า
          </Button>
        </Link>
      </nav>
    </aside>
  );
}
