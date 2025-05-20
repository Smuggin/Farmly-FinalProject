export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: { storeId: string } }
) {
  const storeId = parseInt(context.params.storeId, 10);

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
          },
        },
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

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
        coverImage: p.coverImage,
        price: p.price,
        category: { name: p.category.name },
        store: { name: store.name },
        href: `/store/${store.id}/product/${p.id}`,
      })),
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error('[STORE_API_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
