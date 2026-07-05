"use client";

/* =============================================================================
 *  MODEL UPLOAD + PREVIEW
 *  ---------------------------------------------------------------------------
 *  Lets a customer pick a .glb/.gltf/.stl file, previews it instantly client
 *  side (object URL, no round-trip needed to see it), then uploads it to
 *  /api/upload in the background and reports the resulting URL back to the
 *  parent form (used as `fileUrl` on quote/custom-order submissions).
 * ========================================================================== */

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Loader2, Upload, CheckCircle2, XCircle, Box } from "lucide-react";
import { StlModel } from "./stl-model";

const ACCEPTED = [".glb", ".gltf", ".stl"];
const MAX_SIZE_MB = 40;

function GltfPreview({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export function ModelUploadPreview({
  onUploaded,
  value,
}: {
  onUploaded: (url: string | null) => void;
  value?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [kind, setKind] = useState<"gltf" | "stl" | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    return () => {
      if (localUrl) URL.revokeObjectURL(localUrl);
    };
  }, [localUrl]);

  const handleFile = async (file: File) => {
    setError("");
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED.includes(ext)) {
      setError(`Unsupported file type. Use ${ACCEPTED.join(", ")}.`);
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File is too large (max ${MAX_SIZE_MB}MB).`);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setLocalUrl(objectUrl);
    setKind(ext === ".stl" ? "stl" : "gltf");
    setFileName(file.name);
    setStatus("uploading");
    onUploaded(null);

    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Upload failed");
      setStatus("done");
      onUploaded(data.url);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
      onUploaded(null);
    }
  };

  const previewUrl = localUrl ?? value ?? null;

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {previewUrl ? (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-background/60">
          <Canvas camera={{ fov: 40 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              {kind === "stl" ? (
                <>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[3, 3, 3]} intensity={1} />
                  <Bounds fit clip observe margin={1.4}>
                    <StlModel url={previewUrl} />
                  </Bounds>
                </>
              ) : (
                <Stage environment="city" intensity={0.6} adjustCamera>
                  <GltfPreview url={previewUrl} />
                </Stage>
              )}
            </Suspense>
            <OrbitControls autoRotate autoRotateSpeed={1.5} enablePan={false} />
          </Canvas>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-background/80 px-3 py-2 text-xs backdrop-blur-sm">
            <span className="truncate text-muted-foreground">{fileName || "Uploaded model"}</span>
            {status === "uploading" ? (
              <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
            ) : status === "done" ? (
              <CheckCircle2 className="size-4 shrink-0 text-brand-accent" />
            ) : status === "error" ? (
              <XCircle className="size-4 shrink-0 text-destructive" />
            ) : null}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/40 text-sm text-muted-foreground transition-colors hover:border-brand-accent/50 hover:text-foreground"
        >
          <Box className="size-6" />
          <span className="flex items-center gap-1.5">
            <Upload className="size-3.5" />
            Upload a 3D model (.glb, .gltf, .stl)
          </span>
        </button>
      )}

      {previewUrl ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Choose a different file
        </button>
      ) : null}

      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
