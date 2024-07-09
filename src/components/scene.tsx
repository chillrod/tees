import { Html, OrbitControls, Stage, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model } from "./tee.tsx";
import { SimpleModel } from "./simple-tee.tsx";
import { Suspense, useEffect, useRef } from "react";
import { emitter } from "@/services/mitt.ts";
import StudioLogo from "./studio-logo.astro";
import { Skeleton } from "./ui/skeleton.tsx";
import { CanvasBoardService } from "@/services/canvas-board.service.ts";

interface Props {
  isSimple?: boolean;
  cor?: string;
}
export const Scene = ({ isSimple, cor }: Props) => {
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

  return (
    <div className={`rounded-lg ${isSimple ? "" : "h-[90vh]"} w-full`}>
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
            {isSimple ? <SimpleModel cor={cor} /> : <Model />}
          </Suspense>
        </Stage>
        {/* @ts-ignore */}
        <OrbitControls ref={orbitRef} enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};
