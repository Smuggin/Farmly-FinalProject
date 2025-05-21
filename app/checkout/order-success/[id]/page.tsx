"use client"

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface OrderSuccessPageProps {
  params: { orderId: string };
}

export default function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const router = useRouter();
  const orderId = params.orderId;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">สั่งซื้อเรียบร้อยแล้ว!</h1>
      <p className="text-gray-600 mb-2">หมายเลขคำสั่งซื้อ: <strong>{orderId}</strong></p>
      <p className="text-gray-600 mb-6">ขอบคุณสำหรับการสั่งซื้อของคุณ ระบบจะดำเนินการจัดส่งเร็วที่สุด</p>

      <div className="flex gap-4">
        <Button onClick={() => router.push("/")}>กลับไปหน้าร้าน</Button>
        <Button className="bg-green-600" onClick={() => router.push(`/review/${orderId}`)}>
          ให้คะแนนคำสั่งซื้อ
        </Button>
        <Button variant="secondary" onClick={() => router.push("/history")}>
          ดูคำสั่งซื้อของฉัน
        </Button>
      </div>
    </div>
  );
}
