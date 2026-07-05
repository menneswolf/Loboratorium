"use client";

/* =============================================================================
 *  CAPABILITIES  (technologies + materials)
 *  ---------------------------------------------------------------------------
 *  Tech cards (print technologies) + a materials chip cloud.
 * ========================================================================== */

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { Icon } from "@/components/brand/icon";
import { SectionHeading } from "./section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function Capabilities({ hideHeading = false }: { hideHeading?: boolean } = {}) {
  const { t } = useT();
  const c = t.capabilities;

  return (
    <section id="capabilities" className={hideHeading ? "relative pb-20 pt-4 sm:pb-28 sm:pt-8" : "relative py-20 sm:py-28"}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {!hideHeading ? (
          <SectionHeading
            eyebrow={c.eyebrow}
            title={
              <>
                A studio built for{" "}
                <span className="text-gradient">anything you can model.</span>
              </>
            }
            subtitle={c.subtitle}
          />
        ) : null}

        {/* Tech grid */}
        <StaggerGroup className={hideHeading ? "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" : "mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"}>
          {c.tech.map((t) => (
            <StaggerItem key={t.name}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6"
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-brand-accent/10 blur-2xl transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
                <div className="relative flex size-12 items-center justify-center rounded-xl border border-border bg-background text-brand-accent">
                  <Icon name={t.icon} className="size-6" />
                </div>
                <h3 className="relative mt-5 font-heading text-lg font-semibold text-foreground">
                  {t.name}
                </h3>
                <p className="relative mt-2 text-sm text-muted-foreground">
                  {t.detail}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Materials cloud */}
        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {c.materialsTitle}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {c.materialsSubtitle}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {c.materials.map((m, i) => (
                <motion.span
                  key={m}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.35 }}
                  className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-brand-accent/40 hover:text-foreground"
                >
                  {m}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
