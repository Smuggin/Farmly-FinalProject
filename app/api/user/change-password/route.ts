import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user || !bcrypt.compareSync(currentPassword, user.password)) {
    return NextResponse.json({ error: "รหัสผ่านไม่ถูกต้อง" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { email: user.email },
    data: { password: hashed },
  });

  return NextResponse.json({ success: true });
}
