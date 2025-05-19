"use client";


import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, MapPin, Pencil } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items } = useCart();

  return (
    <div className="px-8 mb-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">ที่อยู่จัดส่ง</h2>
        <Card className="border-green-500">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-green-600" />
              <div>
                <div className="font-semibold">ณธรรม ทองเอียง</div>
                <div className="text-gray-600">
                  25/13 ม.9 ต.ท่ายาง อ.เมือง จ.ชุมพร 86000
                </div>
              </div>
            </div>
            <Button variant="outline" className="text-sm px-3 py-1.5">
              เปลี่ยนที่อยู่
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">ออร์เดอร์ของคุณ</h2>
        <div className="border rounded-md divide-y">
          {items.map((item, index) => (
            <div key={index} className="flex items-center p-4 gap-4">
              <div className="bg-gray-200 w-16 h-16 rounded-md" />
              <div className="flex-1">
                <div className="font-light text-xs leading-2 text-green-600">
                  {item.store.name}
                </div>
                <div className="text-lg">{item.name}</div>
              </div>
              <div className="text-center w-20">{item.price}</div>
              <div className="text-center w-10">{item.quantity}</div>
              <div className="text-right w-20">฿ {(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Payment Method</h2>
        <Card className="bg-green-600 text-white">
          <CardContent className="p-4">
            <RadioGroup defaultValue="promptpay" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="promptpay" id="promptpay" />
                <label htmlFor="promptpay" className="text-white">
                  PromptPay
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="qr" id="qr" />
                <label htmlFor="qr" className="text-white">
                  พร้อมเพย์ QR
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="credit" />
                <label htmlFor="credit" className="text-white">
                  Credit Card
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <label htmlFor="cash" className="text-white">
                  เงินสด
                </label>
              </div>
            </RadioGroup>
            <Separator className="my-4 bg-white/40" />
            <div className="text-right space-y-1 text-sm">
              <div className="flex justify-between">
                <span>ยอดค่าสินค้า</span>
                <span>{items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} ฿</span>
              </div>
              {/* <div className="flex justify-between">
                <span>ส่วนลดคูปอง</span>
                <span>0 ฿</span>
              </div> */}
              <div className="flex justify-between">
                <span>ค่าจัดส่งที่คำนวณ</span>
                <span>34 ฿</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>ราคารวม</span>
                <span>{(items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 34).toFixed(2)}  ฿</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-right">
        <Button className="bg-black text-white px-6 py-2">ชำระเงิน</Button>
      </div>
    </div>
  );
}
