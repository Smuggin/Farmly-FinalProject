'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useStore } from "../_components/StoreContext";
import ProductSection from "@/components/productSection";

export default function ProductsDashboard() {
  const store = useStore();
  const products = store.products ?? [];

  return (
    <div className="flex w-full bg-white">
      <main className="flex-1 px-3 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold align-top">สินค้า</h1>
          <Button className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" /> เพิ่มสินค้า
          </Button>
        </div>
        <div className="grid grid-cols-6 gap-4 mb-6">
          <ProductSection
            products={products.map((p) => ({
              ...p,
              coverImage: p.images?.[0]?.url ?? "",
              store: { name: store.name || "" },
              category: { name: p.category?.name || "" },
            }))}
          />
        </div>
        {/* {products.length === 0 ? (
          <div className="text-center text-gray-500">ยังไม่มีสินค้าในร้านนี้</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Card key={p.id}>
                <CardHeader className="p-2">
                  {p.images?.[0]?.url && (
                    <Image
                      src={p.images[0].url}
                      alt={p.name}
                      width={300}
                      height={200}
                      className="rounded-md"
                    />
                  )}
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-1">
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <p className="text-sm text-green-700 font-medium">฿{p.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )} */}
      </main>
    </div>
  );
}
