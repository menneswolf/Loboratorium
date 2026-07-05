import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { brand } from "@/config/brand";
import { allFontVariables } from "@/lib/fonts";
import { ThemeStyles } from "@/components/brand/theme-styles";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CartDrawer } from "@/components/sections/cart-drawer";
import { CheckoutDialog } from "@/components/sections/checkout-dialog";

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "3D printing",
    "custom 3D printing",
    "3D print service Belgium",
    "rapid prototyping",
    "custom parts",
    "brand merchandising",
    "FDM",
    "SLA resin",
    brand.name,
  ],
  authors: [{ name: brand.name }],
  icons: { icon: brand.logo.src },
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    siteName: brand.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${allFontVariables} antialiased bg-background text-foreground`}
      >
        <ThemeStyles />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* Global overlays — present on every page */}
        <CartDrawer />
        <CheckoutDialog />
        <Toaster />
      </body>
    </html>
  );
}
