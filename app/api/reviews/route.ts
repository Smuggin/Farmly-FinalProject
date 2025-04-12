import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { productId: Number(productId) },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}


export async function POST(req: Request) {
  const { rating, comment, productId, userId } = await req.json();

  if (!rating || !productId || !userId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: { rating, comment, productId, userId },
  });

  return NextResponse.json(review);
}
