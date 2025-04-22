// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
        include: {
          address: true,
          user: true,
          orderItems: {
            include: {
              product: {
                select: {
                  name: true,
                  image: true,
                  store: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
            
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    const formatted = orders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt,
      shopName: order.orderItems[0]?.product.store?.name || "ไม่พบชื่อร้าน",
      shopImage: order.orderItems[0]?.product.image || "/placeholder.png",
      shippingAddress: `${order.address.city}, ${order.address.state}`,
      recipientName: order.user.name,
      status: convertStatus(order.status),
      totalPrice: order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      items: order.orderItems,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "ไม่สามารถดึงข้อมูลออเดอร์ได้" }, { status: 500 });
  }
}

function convertStatus(status: string): string {
  switch (status) {
    case "PROCESSING":
      return "ที่ต้องจัดส่ง";
    case "SHIPPED":
      return "ที่ต้องได้รับ";
    case "DELIVERED":
      return "สำเร็จ";
    case "CANCELLED":
      return "ยกเลิก/ขอคืนเงิน";
    default:
      return "กำลังเตรียม";
  }
}
