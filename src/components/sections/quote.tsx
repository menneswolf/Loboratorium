"use client";

/* =============================================================================
 *  QUOTE
 *  ---------------------------------------------------------------------------
 *  The conversion section. Left rail = headline + reassurance; right rail =
 *  a validated form that POSTs to /api/quote (saved to the database).
 *  All copy is translated via useT().
 * ========================================================================== */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  MapPin,
  Mail,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { brand } from "@/config/brand";
import { Icon } from "@/components/brand/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/motion/reveal";
import { useToast } from "@/hooks/use-toast";

type FormState = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  quantity: string;
  budget: string;
  message: string;
  fileUrl: string;
};

const empty: FormState = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  quantity: "",
  budget: "",
  message: "",
  fileUrl: "",
};

export function Quote() {
  const { t } = useT();
  const q = t.quote;
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) e.name = q.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = q.errEmail;
    if (!form.projectType) e.projectType = q.errProject;
    if (form.message.trim().length < 10) e.message = q.errMessage;
    if (form.fileUrl && !/^https?:\/\/.+/.test(form.fileUrl)) e.fileUrl = q.errFile;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Request failed");
      }
      setStatus("success");
      setForm(empty);
      toast({ title: q.successTitle, description: q.successMsg });
    } catch (err) {
      setStatus("idle");
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="quote" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="accent-glow absolute left-1/2 top-1/4 h-72 w-[680px] -translate-x-1/2" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left rail */}
          <div>
            <SectionHeading
              eyebrow={q.eyebrow}
              title={q.title}
              subtitle={q.subtitle}
            />

            <ul className="mt-8 space-y-4">
              {q.reassurance.map((r) => (
                <Reveal as="li" key={r.title} className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-brand-accent">
                    <Icon name={r.icon} className="size-4" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">
                      {r.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-brand-accent" />
                {brand.contact.location}
              </p>
              <a
                href={`mailto:${brand.contact.email}`}
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="size-4 text-brand-accent" />
                {brand.contact.email}
              </a>
            </div>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
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
                      {q.successTitle}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      {q.successMsg}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => setStatus("idle")}
                    >
                      {q.sendAnother}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label={q.form.name} error={errors.name} required>
                        <Input
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Jane Doe"
                          autoComplete="name"
                        />
                      </Field>
                      <Field label={q.form.email} error={errors.email} required>
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="jane@company.com"
                          autoComplete="email"
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label={q.form.company} error={errors.company}>
                        <Input
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          autoComplete="organization"
                        />
                      </Field>
                      <Field label={q.form.projectType} error={errors.projectType} required>
                        <Select
                          value={form.projectType}
                          onValueChange={(v) => update("projectType", v)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={q.form.pickOne} />
                          </SelectTrigger>
                          <SelectContent>
                            {q.projectTypes.map((p) => (
                              <SelectItem key={p} value={p}>
                                {p}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label={q.form.quantity} error={errors.quantity}>
                        <Input
                          value={form.quantity}
                          onChange={(e) => update("quantity", e.target.value)}
                        />
                      </Field>
                      <Field label={q.form.budget} error={errors.budget}>
                        <Input
                          value={form.budget}
                          onChange={(e) => update("budget", e.target.value)}
                        />
                      </Field>
                    </div>

                    <Field
                      label={q.form.fileUrl}
                      error={errors.fileUrl}
                      hint={q.form.fileHint}
                    >
                      <Input
                        value={form.fileUrl}
                        onChange={(e) => update("fileUrl", e.target.value)}
                        placeholder="https://"
                      />
                    </Field>

                    <Field label={q.form.message} error={errors.message} required>
                      <Textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={4}
                      />
                    </Field>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === "loading"}
                      className="group w-full h-12 text-base"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          {q.form.sending}
                        </>
                      ) : (
                        <>
                          {q.form.send}
                          <ArrowRight className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      {q.form.agree}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
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
      {hint && !error ? (
        <p className="text-xs text-muted-foreground/70">{hint}</p>
      ) : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
