"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import { Mail, Box, Sparkles, Loader2, Copy, Check } from "lucide-react";
import { StlModel } from "@/components/three/stl-model";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Quote = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  projectType: string;
  quantity: string | null;
  budget: string | null;
  message: string;
  fileUrl: string | null;
  createdAt: string | Date;
};

function GltfPreview({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function FilePreview({ url }: { url: string }) {
  const isStl = url.toLowerCase().endsWith(".stl");
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-background/60">
      <Canvas camera={{ fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          {isStl ? (
            <>
              <ambientLight intensity={0.6} />
              <directionalLight position={[3, 3, 3]} intensity={1} />
              <Bounds fit clip observe margin={1.4}>
                <StlModel url={url} />
              </Bounds>
            </>
          ) : (
            <Stage environment="city" intensity={0.6} adjustCamera>
              <GltfPreview url={url} />
            </Stage>
          )}
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={1.5} enablePan={false} />
      </Canvas>
    </div>
  );
}

function QuoteCard({ q }: { q: Quote }) {
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const draft = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/quote-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: q.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not draft a reply.");
      setReply(data.reply);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not draft a reply.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(reply).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-heading text-base font-semibold">{q.name}</p>
          <a
            href={`mailto:${q.email}`}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-3.5" />
            {q.email}
          </a>
          {q.company ? <p className="text-xs text-muted-foreground">{q.company}</p> : null}
        </div>
        <span className="rounded-full bg-brand-accent/10 px-2.5 py-1 text-xs font-medium text-brand-accent">
          {q.projectType}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/90">{q.message}</p>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {q.quantity ? <span>Qty: {q.quantity}</span> : null}
        {q.budget ? <span>Budget: {q.budget}</span> : null}
        <span>{new Date(q.createdAt).toLocaleString()}</span>
      </div>

      {q.fileUrl ? (
        <div className="mt-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Box className="size-3.5" />
            Uploaded model
          </p>
          <FilePreview url={q.fileUrl} />
        </div>
      ) : null}

      {/* AI reply */}
      <div className="mt-4 border-t border-border pt-3">
        {reply ? (
          <div className="space-y-2">
            <Textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={8} />
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={copy}>
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href={`mailto:${q.email}?body=${encodeURIComponent(reply)}`}>
                  <Mail className="size-4" /> Open in email
                </a>
              </Button>
              <Button size="sm" variant="ghost" onClick={draft} disabled={busy}>
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                Redraft
              </Button>
            </div>
          </div>
        ) : (
          <Button size="sm" variant="secondary" onClick={draft} disabled={busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Draft reply with AI
          </Button>
        )}
        {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
      </div>
    </div>
  );
}

export function QuotesList({ quotes }: { quotes: Quote[] }) {
  if (quotes.length === 0) {
    return <p className="text-sm text-muted-foreground">No quote requests yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {quotes.map((q) => (
        <QuoteCard key={q.id} q={q} />
      ))}
    </div>
  );
}
