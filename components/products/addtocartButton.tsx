"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const unitMap: Record<string, string> = {
  kg: "กิโลกรัม",
  liter: "ลิตร",
  piece: "ชิ้น",
  box: "กล่อง",
  bottle: "ขวด",
  pack: "แพ็ค",
  bag: "ถุง",
};

export default function AddToCartButton({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 600)); // Fake delay
    addItem({
      ...product,
      quantity,
      unit: product.unit,
      store: product.store,
    });
    toast.success("เพิ่มสินค้าลงตะกร้าแล้ว", {
      description: `${product.name} จำนวน ${quantity} ${unitMap[product.unit] || product.unit}`,
    });
    setLoading(false);
  };

  return (
    <>
      <div className="w-full flex items-center">
        <div className="flex items-center justify-center space-x-2 w-44">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={decrease}>
            <Minus />
          </Button>
          <div className="flex-1 text-center border border-gray-200 shadow-sm p-1 rounded-md">
            <div className="font-light tracking-tighter">{quantity}</div>
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={increase}>
            <Plus />
          </Button>
        </div>
        <p className="font-semibold text-green-500 ml-4">
          (ต่อ {unitMap[product.unit] || "หน่วยไม่ระบุ"})
        </p>
      </div>

      <div className="w-full mt-4 space-x-2">
        <Button
          className="bg-green-500 font-light"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ShoppingBag className="mr-2 h-4 w-4" />
          )}
          <span>เพิ่มลงตะกร้า</span>
        </Button>

        <Button variant="outline" size="icon">
          <Heart />
        </Button>
      </div>
    </>
  );
}
