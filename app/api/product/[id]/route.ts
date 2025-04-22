import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop(); 

  if (!id) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      category: true,
      store: {
        include: { address: true }, 
      },
    },
  });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  const updatedProduct = await prisma.product.update({
    where: { id: Number(params.id) },
    data,
  });

  return NextResponse.json(updatedProduct);
}
