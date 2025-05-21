'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useStore } from "./_components/StoreContext";
import { useOrders } from "./_components/OrderContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Pie,
  PieChart,
  Label,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";

export default function DashboardPageClient({
  profilePic,
}: {
  profilePic?: string;
}) {
  const store = useStore();
  const orders = useOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="space-y-6 p-6">
        <div className="rounded-xl bg-yellow-100 text-yellow-800 p-4 text-center">
          ยังไม่มีออเดอร์ในร้านของคุณ
        </div>
      </div>
    );
  }

  const revenue = orders.reduce(
    (sum, o) =>
      sum +
      o.orderItems.reduce(
        (itemSum, item) => itemSum + (item.product.price ?? 0) * (item.quantity ?? 1),
        0
      ),
    0
  );
  const pendingCount = orders.filter((o) => o.status === "PENDING").length;
  const uniqueOrderIds = new Set(orders.map((o) => o.id));
  const uniqueCount = uniqueOrderIds.size;
  return(
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-xl bg-gradient-to-r from-green-600 to-green-400 p-6 text-white relative overflow-hidden">
        <div className="z-10 relative">
          <h2 className="text-xl font-bold mb-1">
            เพิ่มสินค้าเข้า {store.name}!
          </h2>
          <p className="mb-4">เริ่มต้นการขายของคุณที่นี่</p>
          <Link href={`/store/${store.id}/addproduct`}>
            <Button className="bg-white text-green-700 hover:bg-green-100">
              + เพิ่มสินค้า
            </Button>
          </Link>
        </div>
        <Image
          src="/produce-banner.jpg"
          alt="Produce"
          width={300}
          height={150}
          className="absolute right-4 bottom-0 rounded-lg opacity-20"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard title="รายได้" value={`฿ ${revenue.toFixed(2)}`} />
        <StatCard title="ออเดอร์" value={uniqueCount} />
        <StatCard title="ที่ต้องส่ง" value={pendingCount.toString()} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <ChartRevenueByProduct />
        <ChartRevenueLineChart />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-xs text-gray-500 mt-1">ณ วันที่ 18 พ.ค. 2025</p>
    </div>
  );
}

// 🧠 Revenue by Product Pie Chart
function ChartRevenueByProduct() {
  const orders = useOrders();

  const productRevenueMap = new Map<string, number>();

  for (const order of orders) {
    for (const item of order.orderItems) {
      const name = item.product.name;
      const revenue = item.product.price * item.quantity;
      productRevenueMap.set(name, (productRevenueMap.get(name) ?? 0) + revenue);
    }
  }

  const chartData = Array.from(productRevenueMap.entries()).map(
    ([name, value], i) => ({
      name,
      revenue: value,
      fill: `hsl(var(--chart-${(i % 5) + 1}))`,
    })
  );

  const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);

  const chartConfig = Object.fromEntries(
    chartData.map((d) => [d.name, { label: d.name, color: d.fill }])
  );
  chartConfig.revenue = { label: "Revenue", color: "hsl(var(--chart-1))" };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>รายได้ตามสินค้า</CardTitle>
        <CardDescription>จากยอดขายทั้งหมด</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="revenue" nameKey="name" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          ฿{totalRevenue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          รวมรายได้
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          สินค้าขายดีสุดเดือนนี้ <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">รวมตามข้อมูลทั้งหมดจากระบบ</div>
      </CardFooter>
    </Card>
  );
}

// 🧠 Revenue Over Time Line Chart
function ChartRevenueLineChart() {
  const orders = useOrders();

  const revenueByMonth = new Map<string, number>();
  orders.forEach((order) => {
    if (!order.createdAt) return;
    const date = new Date(order.createdAt);
    const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    revenueByMonth.set(
      monthKey,
      (revenueByMonth.get(monthKey) ?? 0) + (order.price ?? 0)
    );
  });

  const chartData = Array.from(revenueByMonth.entries())
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([month, revenue]) => ({ month, revenue }));

  const chartConfig = {
    revenue: { label: 'รายได้', color: 'hsl(var(--chart-1))' },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>รายได้ทั้งหมด</CardTitle>
        <CardDescription>ตามเดือนที่มีการขาย</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="revenue"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              fill="url(#revGrad)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        รายได้รวมตามข้อมูลทั้งหมด
      </CardFooter>
    </Card>
  );
}
