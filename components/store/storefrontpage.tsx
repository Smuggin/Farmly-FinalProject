'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ProductSection from '@/components/productSection';

type Product = {
  id: number;
  name: string;
  image?: string | null;
  price: number;
  category: {
    name: string;
  };
};

type Store = {
  id: number;
  name: string;
  address?: string;
  image: string;
  products: Product[];
};

export default function StorefrontPage() {
  const { id } = useParams(); // grab store id from URL
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchStore = async () => {
      try {
        const res = await fetch(`/api/store/${id}`);
        const data = await res.json();
        setStore(data);
      } catch (err) {
        console.error('Failed to load store', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  if (loading) return <div className="p-6">กำลังโหลดข้อมูลร้านค้า...</div>;
  if (!store) return <div className="p-6 text-red-500">ไม่พบร้านค้า</div>;

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <div className="flex flex-col items-center text-center">
          <Image
            src={store.image || "/store-avatar.png"}
            alt="Store Avatar"
            width={96}
            height={96}
            className="rounded-full"
          />
          <h2 className="text-xl font-bold mt-4">{store.name}</h2>
          <p className="text-sm text-muted-foreground">
            {store.address || 'ที่อยู่ไม่ระบุ'}
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
            <h2 className="text-xl font-bold mb-1">เพิ่มสินค้าเข้า {store.name}!</h2>
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

        {/* Products */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">สินค้ายอดนิยม</h3>
          <Button variant="secondary">ดูเพิ่มเติม</Button>
        </div>

        <div className="grid grid-cols-4 mx-auto gap-6 mt-4">
          <ProductSection products={store.products} />
        </div>
      </main>
    </div>
  );
}
