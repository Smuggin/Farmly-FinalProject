import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, phone: true },
  });

  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name: data.name,
      phone: data.phone,
    },
  });

  return NextResponse.json(user);
}
