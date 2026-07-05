import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, Package, XCircle } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

export default async function OrderPage({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const order = await db.order.findUnique({
    where: { ref },
    include: { items: true },
  });

  if (!order) notFound();

  const state = orderState(order.status);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
            <state.icon className="size-6" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Order {order.ref}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight">
              {state.title}
            </h1>
            <p className="mt-2 text-muted-foreground">{state.message}</p>
          </div>
        </div>

        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-background/40">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-muted-foreground">Qty {item.qty}</p>
              </div>
              <p className="font-semibold">EUR {(item.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-3 font-heading font-bold">
            <span>Total</span>
            <span>EUR {order.total.toFixed(2)}</span>
          </div>
        </div>

        {order.trackingUrl ? (
          <Button asChild className="mt-6">
            <a href={order.trackingUrl} target="_blank" rel="noreferrer">
              Track shipment
            </a>
          </Button>
        ) : (
          <Button asChild className="mt-6" variant="outline">
            <Link href="/shop">Back to shop</Link>
          </Button>
        )}
      </div>
    </section>
  );
}

function orderState(status: string) {
  if (status === "paid" || status === "processing") {
    return {
      icon: CheckCircle2,
      title: "Payment received",
      message: "Thanks. We are preparing your order and will add tracking as soon as it ships.",
    };
  }
  if (status === "shipped" || status === "delivered") {
    return {
      icon: Package,
      title: "Your order is on its way",
      message: "Your shipment has been created. Use the tracking link below for delivery updates.",
    };
  }
  if (status === "failed" || status === "expired" || status === "cancelled") {
    return {
      icon: XCircle,
      title: "Payment not completed",
      message: "The payment did not complete. Please place the order again or contact us for help.",
    };
  }
  return {
    icon: Clock,
    title: "Awaiting payment",
    message: "If you just paid, this page will update once Mollie confirms the payment.",
  };
}
