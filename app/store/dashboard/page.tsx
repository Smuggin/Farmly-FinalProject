import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // adjust path as needed
import DashboardPageClient from "./DashboardPageClient";
import { prisma } from "@/lib/prisma"; // adjust if needed

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log("Session111", session);
  if (session?.user?.user_id) {
    var store = await prisma.store.findUnique({
      where: { ownerId: parseInt(session.user.user_id) },
    });
  }
  if (!session || !session.user?.user_id || !store) {
    return <div className="p-6 text-center">กรุณาเข้าสู่ระบบ</div>;
  }

  return <DashboardPageClient storeId={store.id}  profilePic={session.user.image ?? "/default-avatar.png"}/>;
}