"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Package, FileText, ShoppingBag, LogOut, Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/quotes", label: "Quote requests", icon: FileText },
  { href: "/admin/products", label: "Products", icon: Package },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {NAV.map((item) => {
        const active =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-brand-accent/10 text-brand-accent"
                : "text-muted-foreground hover:bg-background hover:text-foreground"
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
    >
      <LogOut className="size-4" />
      Sign out
    </button>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-border bg-card sm:flex">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo size={28} />
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <NavLinks />
        </div>
        <div className="border-t border-border p-3">
          <SignOutButton />
        </div>
      </aside>

      {/* Mobile drawer */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-64 border-border bg-card p-0">
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          <div className="flex h-16 items-center border-b border-border px-5">
            <Logo size={28} />
          </div>
          <div className="p-3">
            <NavLinks onNavigate={() => setMenuOpen(false)} />
          </div>
          <div className="border-t border-border p-3">
            <SignOutButton />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur sm:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground"
          >
            <Menu className="size-5" />
          </button>
          <Logo size={24} />
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
