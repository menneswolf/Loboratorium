"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { t } = useT();
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="accent-glow absolute left-1/2 top-1/2 h-60 w-[600px] -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="text-center">
        <p className="font-heading text-7xl font-bold text-gradient sm:text-9xl">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {t.common.notFoundTitle}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          {t.common.notFoundText}
        </p>
        <Button asChild variant="outline" className="mt-8 group">
          <Link href="/">
            <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
            {t.common.backToHome}
          </Link>
        </Button>
      </div>
    </section>
  );
}
