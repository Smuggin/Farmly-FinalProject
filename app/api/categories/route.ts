import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient();
export async function GET() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(categories);
}
