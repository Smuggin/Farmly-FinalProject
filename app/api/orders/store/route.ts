import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; // adjust path
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await prisma.store.findUnique({
    where: { ownerId: Number(session.user.user_id) },
  });

  if (!store) {
    return NextResponse.json({ error: "store not found" }, { status: 404 });
  }
  
  console.log("Store", store);

  if (!store) {
    return NextResponse.json({ error: "Store not found" }, { status: 404 });
  }

  const orderItems = await prisma.orderItem.findMany({
    where: {
      product: {
        storeId: store.id,
      },
    },
    include: {
      order: {
        include: {
          address: true,
          user: {
            select: { name: true },
          },
        },
      },
      product: {
        include: {
          images: true,
        },
      },
    },
  });
  console.log("Order Items", orderItems);
  return NextResponse.json( orderItems );
}
