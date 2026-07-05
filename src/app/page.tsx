import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { CustomOrders } from "@/components/sections/custom-orders";
import { ForBrands } from "@/components/sections/for-brands";
import { Capabilities } from "@/components/sections/capabilities";
import { Work } from "@/components/sections/work";
import { Process } from "@/components/sections/process";
import { Quote } from "@/components/sections/quote";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CustomOrders />
        <ForBrands />
        <Capabilities />
        <Work />
        <Process />
        <Quote />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
