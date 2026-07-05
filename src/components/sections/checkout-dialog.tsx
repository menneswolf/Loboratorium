"use client";

/* =============================================================================
 *  CHECKOUT DIALOG
 *  ---------------------------------------------------------------------------
 *  Collects shipping details, validates, POSTs to /api/orders (which computes
 *  the real total server-side), then shows a success screen with the order ref.
 * ========================================================================== */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, ArrowLeft, Info } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { localizedPrice } from "@/config/products";
import { useProducts } from "@/lib/products-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type FormState = {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

const empty: FormState = {
  name: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "Belgium",
};

export function CheckoutDialog() {
  const { t, locale } = useT();
  const s = t.shop;
  const checkoutOpen = useCart((st) => st.checkoutOpen);
  const closeCheckout = useCart((st) => st.closeCheckout);
  const items = useCart((st) => st.items);
  const clear = useCart((st) => st.clear);
  const products = useProducts();

  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [orderRef, setOrderRef] = useState<string>("");

  const subtotal = items.reduce((sum, i) => {
    const p = products.find((p) => p.id === i.productId);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
  const shipping = subtotal >= 150 ? 0 : 6.5;
  const total = subtotal + shipping;

  const update = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) e.name = s.checkout.errRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = s.checkout.errEmail;
    if (form.address.trim().length < 4) e.address = s.checkout.errRequired;
    if (form.city.trim().length < 2) e.city = s.checkout.errRequired;
    if (form.postalCode.trim().length < 2) e.postalCode = s.checkout.errRequired;
    if (form.country.trim().length < 2) e.country = s.checkout.errRequired;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = async () => {
    if (!validate()) return;
    if (items.length === 0) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale, items }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Order failed");
      setOrderRef(data.ref);
      clear();
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors((e) => ({ ...e, name: "—" }));
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      closeCheckout();
      // reset shortly after close so the success screen doesn't flash
      setTimeout(() => {
        setStatus("idle");
        setForm(empty);
        setErrors({});
        setOrderRef("");
      }, 200);
    }
  };

  return (
    <Dialog open={checkoutOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card p-0 sm:max-w-lg">
        <DialogHeader className="border-b border-border px-5 py-4">
          <DialogTitle className="font-heading text-lg font-bold">
            {s.checkout.title}
          </DialogTitle>
          <DialogDescription>{s.checkout.subtitle}</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center px-6 py-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                className="flex size-16 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent"
              >
                <CheckCircle2 className="size-9" />
              </motion.div>
              <h3 className="mt-5 font-heading text-2xl font-bold text-foreground">
                {s.checkout.successTitle}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                {s.checkout.successMsg}
              </p>
              <div className="mt-5 rounded-xl border border-border bg-background/50 px-5 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {s.checkout.orderRef}
                </p>
                <p className="mt-1 font-heading text-xl font-bold text-brand-accent">
                  {orderRef}
                </p>
              </div>
              <Button className="mt-6 w-full" onClick={() => handleClose(false)}>
                {s.checkout.close}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 px-5 py-5"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={s.checkout.name} error={errors.name} required>
                  <Input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    autoComplete="name"
                  />
                </Field>
                <Field label={s.checkout.email} error={errors.email} required>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    autoComplete="email"
                  />
                </Field>
              </div>
              <Field label={s.checkout.address} error={errors.address} required>
                <Input
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  autoComplete="street-address"
                />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label={s.checkout.postalCode} error={errors.postalCode} required>
                  <Input
                    value={form.postalCode}
                    onChange={(e) => update("postalCode", e.target.value)}
                    autoComplete="postal-code"
                  />
                </Field>
                <Field label={s.checkout.city} error={errors.city} required>
                  <Input
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    autoComplete="address-level2"
                  />
                </Field>
                <Field label={s.checkout.country} error={errors.country} required>
                  <Input
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    autoComplete="country-name"
                  />
                </Field>
              </div>

              {/* Payment note */}
              <div className="flex items-start gap-2 rounded-xl border border-border bg-background/40 p-3 text-xs text-muted-foreground">
                <Info className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                <p>{s.checkout.paymentNote}</p>
              </div>

              {/* Order summary */}
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{s.cart.subtotal}</span>
                  <span className="font-medium text-foreground">
                    {localizedPrice(subtotal, locale)}
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-muted-foreground">{s.cart.shipping}</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? "—" : localizedPrice(shipping, locale)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-border pt-2 font-heading text-base font-bold">
                  <span className="text-foreground">{s.cart.total}</span>
                  <span className="text-foreground">{localizedPrice(total, locale)}</span>
                </div>
              </div>

              <Button
                onClick={placeOrder}
                disabled={status === "loading" || items.length === 0}
                className="group w-full"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {s.checkout.processing}
                  </>
                ) : (
                  <>
                    {s.checkout.placeOrder}
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    closeCheckout();
                    useCart.getState().openDrawer();
                  }}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="size-3" />
                  {s.checkout.back}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="ml-0.5 text-brand-accent">*</span> : null}
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
