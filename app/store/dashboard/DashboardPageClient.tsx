'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { signOut } from 'next-auth/react';

// Simple classNames utility
function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

type Store = {
  id: string;
  name: string;
  address?: string;
  images: { id: number; url: string; contentType: string }[];
};

export default function DashboardPageClient({
  storeId,
  profilePic,
}: {
  storeId: string;
  profilePic: string;
}) {
  const [store, setStore] = useState<Store | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders/store")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data); // ✅ use orderItems from object
        } else {
          console.error("Invalid response from /api/orders/store:", data);
          setOrders([]);
        }
      })
      .catch((err) => {
        console.error("Error loading orders:", err);
        setOrders([]);
      });
  }, []);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await fetch(`/api/store/${storeId}`);
        const data = await res.json();
        setStore(data);
      } catch (err) {
        console.error('Failed to load store', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [storeId]);
  const storeImage = store?.images?.[0]?.url || '/store-avatar.png';
  if (loading) return <div className="p-6">กำลังโหลดข้อมูล...</div>;
  if (!store) return <div className="p-6 text-red-500">ไม่พบร้านค้า</div>;

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
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
          <p className="text-sm text-muted-foreground">{store.address || 'ที่อยู่ไม่ระบุ'}</p>
        </div>

        <nav className="mt-6 space-y-2">
            <Button variant="ghost" className="w-full justify-start">สินค้า</Button>
            <Button variant="ghost" className="w-full justify-start">หมวดหมู่</Button>
            <Button variant="ghost" className="w-full justify-start">ออเดอร์</Button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        <div className='flex w-full flex-row-reverse'>
          <Menu as="div" className="relative ml-3">
            <MenuButton className="relative flex rounded-full text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
              <img
                alt={profilePic || "User"}
                src={profilePic}
                className="size-8 rounded-full"
              />
            </MenuButton>
            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-none">
              <MenuItem>
                {({ active }) => (
                  <a
                    href="/profile"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    โปรไฟล์ของคุณ
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "w-full text-left px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    ออกจากระบบ
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        <div className="rounded-xl bg-gradient-to-r from-green-600 to-green-400 p-6 text-white relative overflow-hidden">
          <div className="z-10 relative">
            <h2 className="text-xl font-bold mb-1">เพิ่มสินค้าเข้า {store.name}!</h2>
            <p className="mb-4">เริ่มต้นการขายของคุณที่นี่</p>
            <Link href={`/store/${store.id}/addproduct`}>
              <Button className="bg-white text-green-700 hover:bg-green-100">+ เพิ่มสินค้า</Button>
            </Link>
          </div>
          <Image
            src="/produce-banner.jpg"
            alt="Produce"
            width={300}
            height={150}
            className="absolute right-4 bottom-0 rounded-lg opacity-20"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">รายได้</p>
            <h3 className="text-2xl font-bold">฿ {orders.reduce((sum, order) => sum + (order.price || 0), 0)}</h3>
            <p className="text-xs text-gray-500 mt-1">ณ วันที่ 18 พ.ค. 2025</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">ออเดอร์</p>
            <h3 className="text-2xl font-bold">{orders.length}</h3>
            <p className="text-xs text-gray-500 mt-1">ณ วันที่ 18 พ.ค. 2025</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">ที่ต้องส่ง</p>
            <h3 className="text-2xl font-bold">
              {orders.filter(order => order.status === 'pending').length}
            </h3>
            <p className="text-xs text-gray-500 mt-1">ณ วันที่ 18 พ.ค. 2025</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-lg border p-4 h-64 flex items-center justify-center text-muted-foreground">
            📊 รายได้ตามสินค้า (Pie Chart Placeholder)
          </div>
          <div className="rounded-lg border p-4 h-64 flex items-center justify-center text-muted-foreground">
            📈 รายได้ทั้งหมด (Line Chart Placeholder)
          </div>
        </div>
      </main>
    </div>
  );
}
