// app/api/store/[id]/route.ts
export const runtime = 'nodejs';   // Prisma only works on Node.js runtime

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }  // note Promise<>
) {
  // **await** the params before destructuring
  const { id } = await context.params;
  const storeId = parseInt(id, 10);

  if (isNaN(storeId)) {
    return NextResponse.json({ error: 'Invalid store ID' }, { status: 400 });
  }

  try {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        images: true,
        products: {
          include: {
            category: true,
            images: true, // << Prisma จะรู้จักแล้ว ถ้าข้างบนถูกต้อง
          },
        },
      },
    });


    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // reshape to match your ProductSection
    const payload = {
      id: store.id,
      name: store.name,
      images: store.images.map((img) => ({
        id: img.id,
        url: img.url,
      })),
      products: store.products.map((p) => ({
        id: p.id,
        name: p.name,
        images: p.images.map((img) => ({
          id: img.id,
          url: img.url,
        })),
        price: p.price,
        category: { name: p.category.name },
        store: { name: store.name }, // 👈 เพิ่ม store เข้าไปที่สินค้า
        href: `/store/${store.id}/product/${p.id}`,
      })),
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error('[STORE_API_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
