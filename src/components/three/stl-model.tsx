"use client";

import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three-stdlib";
import { Center } from "@react-three/drei";

export function StlModel({ url }: { url: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const loader = useMemo(() => new STLLoader(), []);

  useEffect(() => {
    let cancelled = false;
    loader.load(url, (geo) => {
      if (!cancelled) {
        geo.computeVertexNormals();
        setGeometry(geo);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [url, loader]);

  if (!geometry) return null;

  return (
    <Center>
      <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#e8874a" roughness={0.35} metalness={0.1} />
      </mesh>
    </Center>
  );
}
