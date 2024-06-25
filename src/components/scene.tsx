import { Html, OrbitControls, Stage, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model } from "./tee.tsx";
import { Suspense, useEffect, useRef } from "react";
import { emitter } from "@/services/mitt.ts";
import StudioLogo from "./studio-logo.astro";

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <span className="flex flex-col justify-center text-center">
        {progress}% Carregando...
      </span>
    </Html>
  );
}

export const Scene = () => {
  const orbitRef = useRef();

  const resetOrbit = () => {
    if (!orbitRef.current) return;
    // @ts-ignore
    orbitRef.current.reset();
  };

  useEffect(() => {
    emitter.on("centerShirt", () => {
      resetOrbit();
    });

    resetOrbit();

    return () => {
      emitter.off("centerShirt");
    };
  }, []);

  return (
    <div className="h-full w-full rounded-lg relative">
      <Canvas shadows className="rounded-lg" performance={{ min: 0.5 }}>
        <hemisphereLight args={[0xffffbb, 0x080820, 1]} />

        <Stage intensity={0.5}>
          <Suspense fallback={<Loader />}>
            <Model />
          </Suspense>
        </Stage>
        {/* @ts-ignore */}
        <OrbitControls ref={orbitRef} enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};
