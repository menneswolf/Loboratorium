"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import { Mail, Box } from "lucide-react";
import { StlModel } from "@/components/three/stl-model";

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

export function QuotesList({ quotes }: { quotes: Quote[] }) {
  if (quotes.length === 0) {
    return <p className="text-sm text-muted-foreground">No quote requests yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {quotes.map((q) => (
        <div key={q.id} className="rounded-2xl border border-border bg-card p-5">
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
              {q.company ? (
                <p className="text-xs text-muted-foreground">{q.company}</p>
              ) : null}
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
        </div>
      ))}
    </div>
  );
}
