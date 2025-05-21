import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export async function GET() {
  const threads = await prisma.thread.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      comments: true,
    },
  });

  // แปลงข้อมูลให้เหมาะสม
  const formatted = threads.map((t) => ({
    id: t.id,
    title: t.title,
    author: t.author.name,
    createdAt: t.createdAt.toISOString(),
    replies: t.comments.length,
  }));

  return NextResponse.json(formatted);
}
