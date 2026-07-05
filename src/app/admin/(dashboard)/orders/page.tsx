import { db } from "@/lib/db";
import { OrdersTable } from "@/components/admin/orders-table";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">{orders.length} total</p>
      <div className="mt-6">
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
