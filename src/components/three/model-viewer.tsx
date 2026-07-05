"use client";

/* =============================================================================
 *  MODEL VIEWER
 *  ---------------------------------------------------------------------------
 *  Renders a .glb/.gltf model with auto-rotate + drag-to-orbit. Used on
 *  product pages when a product has `modelUrl` set (owner's own 3D files,
 *  dropped into public/models/ and wired up from /admin/products).
 * ========================================================================== */

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF } from "@react-three/drei";
import { Loader2 } from "lucide-react";

function GltfModel({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  return <primitive object={scene} />;
}

export function ModelViewer({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={className ?? "absolute inset-0"}>
      <Canvas camera={{ fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} adjustCamera>
            <GltfModel src={src} />
          </Stage>
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={1.2} enablePan={false} />
      </Canvas>
    </div>
  );
}

export function ModelViewerFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-card">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}
