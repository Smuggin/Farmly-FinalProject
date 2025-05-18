// app/profile/page.tsx or wherever your route is
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn/ui component
import Image from "next/image";

const prisma = new PrismaClient();

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return <div className="p-6 text-red-500">Unauthorized</div>;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const latestOrder = await prisma.order.findFirst({
    where: { userId: user?.id },
    include: {
      address: true,
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
              price: true,
              store: {
                select: {
                  name: true,
                  images: true,
                },
              },
              images: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log("Latest Order", latestOrder);
  if (!user) {
    return <div className="p-6 text-red-500">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-400 p-6 text-white shadow-md rounded-b-2xl">
        <div className="flex items-center space-x-4">
          <Image
            src={user.profilePic || "https://ui-avatars.com/api/?name=User&background=ccc&color=fff&size=64"}
            alt="User"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div>
            <h1 className="text-xl font-semibold">ชื่อผู้ใช้: {user.name}</h1>
            <p className="text-sm opacity-90">
              สมาชิกตั้งแต่:{" "}
              {user.createdAt.toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          ข้อมูลผู้ใช้งาน
        </h2>
        <div className="bg-white shadow rounded-lg p-4 space-y-2">
          <p>
            <strong>อีเมล:</strong> {user.email}
          </p>
          <p>
            <strong>เบอร์โทร:</strong> {user.phone || "ไม่ระบุ"}
          </p>
        </div>
      </div>
      
      {/* Orders */}
      {latestOrder && latestOrder.orderItems.length > 0 && (
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            การสั่งซื้อของฉัน
          </h2>
          <div className="bg-white shadow rounded-lg p-4">
            <ul className="space-y-2">
              {latestOrder.orderItems.slice(0, 5).map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="text-green-600 font-medium">
                    ฿{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}

              <li className="flex justify-between text-sm text-gray-600 pt-2 border-t mt-2">
                <span>
                  วันที่สั่งซื้อ:{" "}
                  {new Date(latestOrder.createdAt).toLocaleDateString("th-TH", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>สถานะ: {latestOrder.status || "กำลังดำเนินการ"}</span>
              </li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              ดูคำสั่งซื้อทั้งหมด
            </button>
          </div>
        </div>
      )}
      {/* No Orders */}
      {!latestOrder && (
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            การสั่งซื้อของฉัน
          </h2>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-600">ยังไม่มีการสั่งซื้อ</p>
          </div>
        </div>
      )}

      {/* Preferences */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">การตั้งค่า</h2>
        <div className="bg-white shadow rounded-lg p-4 space-y-3">
          <button className="block w-full text-left text-gray-700 hover:text-green-600">
            แก้ไขข้อมูลส่วนตัว
          </button>
          <button className="block w-full text-left text-gray-700 hover:text-green-600">
            เปลี่ยนรหัสผ่าน
          </button>
          <button className="block w-full text-left text-red-500 hover:underline">
            ออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  );
}
