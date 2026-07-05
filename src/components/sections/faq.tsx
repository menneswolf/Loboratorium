"use client";

/* =============================================================================
 *  FAQ
 *  ---------------------------------------------------------------------------
 *  Accordion of frequently asked questions (content from brand config).
 * ========================================================================== */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/motion/reveal";

export function Faq({ hideHeading = false }: { hideHeading?: boolean } = {}) {
  const { t } = useT();
  const f = t.faq;

  return (
    <section id="faq" className={hideHeading ? "relative pb-20 pt-4 sm:pb-28 sm:pt-8" : "relative py-20 sm:py-28"}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {!hideHeading ? (
          <SectionHeading
            eyebrow={f.eyebrow}
            title={f.title}
            align="center"
          />
        ) : null}
        <Reveal delay={0.1} className={hideHeading ? "mt-8" : "mt-12"}>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="w-full"
          >
            {f.items.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left font-heading text-base font-semibold hover:no-underline sm:text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
