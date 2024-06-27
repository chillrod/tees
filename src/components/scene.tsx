import { Html, OrbitControls, Stage, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model } from "./tee.tsx";
import { Suspense, useEffect, useRef } from "react";
import { emitter } from "@/services/mitt.ts";
import StudioLogo from "./studio-logo.astro";
import { Skeleton } from "./ui/skeleton.tsx";

export const Scene = () => {
  const orbitRef = useRef();
  const { progress, active } = useProgress();

  const resetOrbit = () => {
    if (!orbitRef.current) return;
    // @ts-ignore
    orbitRef.current.reset();
  };

  useEffect(() => {
    emitter.on("centerShirt", () => {
      resetOrbit();
    });

    return () => {
      emitter.off("centerShirt");
    };
  }, []);

  useEffect(() => {
    resetOrbit();
  }, [active]);

  return (
    <div className="aspect-square rounded-lg">
      <Canvas>
        <Stage intensity={4}>
          <Suspense
            fallback={
              <>
                <Html center>
                  <span className="flex flex-col justify-center text-center">
                    <Skeleton className="aspect-square  bg-stone-200" />
                    {progress}% Carregando...
                  </span>
                </Html>
              </>
            }
          >
            <Model />
          </Suspense>
        </Stage>
        {/* @ts-ignore */}
        <OrbitControls ref={orbitRef} enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};
