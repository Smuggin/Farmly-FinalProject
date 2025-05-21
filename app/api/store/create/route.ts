import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.user_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  try {
    const address = await prisma.address.create({
      data: {
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      },
    });

    const store = await prisma.store.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: parseInt(session.user.user_id),
        addressId: address.id,
      },
    });

    return NextResponse.json({ store });
  } catch (error) {
    console.error("Create Store Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
