import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CartDrawer } from "@/components/sections/cart-drawer";
import { CheckoutDialog } from "@/components/sections/checkout-dialog";
import { ProductsHydrator } from "@/components/brand/products-hydrator";
import { LocaleInitializer } from "@/components/brand/locale-initializer";
import { ChatWidget } from "@/components/sections/chat-widget";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductsHydrator />
      <LocaleInitializer />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      {/* Global overlays — present on every public page */}
      <CartDrawer />
      <CheckoutDialog />
      <ChatWidget />
    </>
  );
}
