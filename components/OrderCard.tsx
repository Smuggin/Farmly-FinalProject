import React from "react";

interface OrderProps {
  id: number;
  shopName: string;
  shopImage: string;
  shippingAddress: string;
  recipientName: string;
  status: string;
  totalPrice: number;
  items: string[];
}

const statusColors: Record<string, string> = {
  "สำเร็จ": "text-green-500",
  "ที่ต้องได้รับ": "text-yellow-500",
  "ที่ต้องจัดส่ง": "text-black",
  "ยกเลิก/ขอคืนเงิน": "text-red-500",
};

const OrderCard: React.FC<OrderProps> = ({
  id,
  shopName,
  shopImage,
  shippingAddress,
  recipientName,
  status,
  totalPrice,
  items,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex gap-4">
      {/* รูปสินค้า */}
      <img src={shopImage} alt={shopName} className="w-20 h-20 rounded-lg object-cover" />

      {/* รายละเอียดออเดอร์ */}
      <div className="flex flex-col flex-grow">
        <div className="text-lg font-semibold">{`ออเดอร์ #${id}`}</div>
        <div className="text-sm text-gray-500">{shopName}</div>
        <div className="text-sm text-gray-500">📍 {shippingAddress}</div>
        <div className="text-sm text-gray-500">👤 {recipientName}</div>
        <div className="text-sm text-gray-500">🛒 {items.join(", ")} ...</div>
      </div>

      {/* ราคา & สถานะ */}
      <div className="text-right">
        <div className={`text-xl font-bold ${statusColors[status]}`}>฿ {totalPrice.toLocaleString()}</div>
        <div className={`text-sm ${statusColors[status]}`}>{status}</div>
      </div>
    </div>
  );
};

export default OrderCard;
