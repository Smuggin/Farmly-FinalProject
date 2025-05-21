// app/api/file/create/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { table, recordId, filename, contentType, url, storeId } = body;

  try {
    const file = await prisma.file.create({
      data: {
        table,
        recordId,
        filename,
        contentType,
        url,
        storeId,
      },
    });

    return NextResponse.json(file, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save file metadata" }, { status: 500 });
  }
}
