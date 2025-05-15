// /app/api/addproduct/route.ts (ถ้าใช้ App Router)
import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, price, unit, type, stock, description, storeId } = body;

    const store = await prisma.store.findUnique({
      where: { id: Number(storeId) },
    });

    if (!store) {
      return NextResponse.json(
        { message: `Store with id ${storeId} does not exist.` },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: productName,
        price,
        stock,
        unit,
        description,
        storeId: Number(storeId),
        categoryId: type,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Add product error:", JSON.stringify(error, null, 2));
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}
