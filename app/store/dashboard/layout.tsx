// Server Component
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
import { StoreProvider } from "./_components/StoreContext";
import { redirect } from "next/navigation";
import { OrderProvider } from "./_components/OrderContext";

// This type should match your NormalizedOrder in OrderContext
type NormalizedOrder = {
  id: number;
  price?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    name: string;
  };
  address?: {
    id: number;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  orderItems: {
    id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      price: number;
      images: { id: number; url: string }[];
    };
  }[];
};

function normalizeOrders(orderItems: any[]): NormalizedOrder[] {
  const orderMap = new Map<number, NormalizedOrder>();

  for (const item of orderItems) {
    const orderId = item.order.id;
    if (!orderMap.has(orderId)) {
      orderMap.set(orderId, {
        id: orderId,
        price: item.order.price,
        status: item.order.status,
        createdAt: item.order.createdAt,
        updatedAt: item.order.updatedAt,
        user: item.order.user,
        address: item.order.address,
        orderItems: [],
      });
    }

    orderMap.get(orderId)?.orderItems.push({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        images: item.product.images,
      },
    });
  }

  return Array.from(orderMap.values());
}


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.user_id) {
    return <div className="p-6 text-center">กรุณาเข้าสู่ระบบ</div>;
  }

  const store = await prisma.store.findUnique({
    where: { ownerId: parseInt(session.user.user_id) },
    include: { images: true, products: true },
  });
  
  const rawOrderItems = await prisma.orderItem.findMany({
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

  const normalizedOrders = normalizeOrders(rawOrderItems);

  if (!store) {
    // Redirect or render your “no store” UI
    redirect("/store/create");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar store={store} />
      <div className="flex-1 flex flex-col">
        <Navbar profilePic={session.user.image ?? "/default-avatar.png"} />
        <StoreProvider store={store}>
            <OrderProvider orders={normalizedOrders}>
                <main className="flex-1 p-6">{children}</main>
            </OrderProvider>
        </StoreProvider>
      </div>
    </div>
  );
}
