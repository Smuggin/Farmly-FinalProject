import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("Session", session)
  if (!session || !session.user?.email) {
    console.log("No session found")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const orders = await prisma.order.findMany({
  where: { userId: user.id },
  include: {
          address: true,
          user: true,
          orderItems: {

            
            include: {
              product: {
                select: {
                  name: true,
                  image: true,
                  price: true,
                  store: true,
                  },
                },
              },
            
            
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

  // Map ให้พร้อมใช้กับ OrderCard
  const formatted = orders.map(order => ({
  id: order.id,
  recipientName: order.user.name,
  shippingAddress: `${order.address.street}, ${order.address.city}, ${order.address.state}`,
  status: mapOrderStatus(order.status),
  shopName: order.orderItems[0]?.product.store.name ?? "ไม่ทราบร้าน",
  shopImage: order.orderItems[0]?.product.store.image ?? "/default-shop.png",
  totalPrice: order.orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  items: order.orderItems.map(item => ({
    product: { name: item.product.name },
    quantity: item.quantity,
    price: item.price
  }),  
  console.log("Order", order.orderItems[0])
)
}));

  return NextResponse.json(formatted);
}

// แปลง status ภาษาอังกฤษ -> ไทย
function mapOrderStatus(status: string): string {
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
      return "ทั้งหมด";
  }
}
