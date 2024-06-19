import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model } from "./tee.tsx";
import { ThreeColors } from "./three-controls/colors.tsx";

export const Scene = () => {
  return (
    <div className="h-full w-full relative">
      <Canvas shadows className="rounded-lg h-full w-full bg-stone-100 dark:bg-stone-800">
        <hemisphereLight args={[0xffffbb, 0x080820, 1]} />

        <Stage intensity={1} shadows="contact">
          <Model />
        </Stage>
        <OrbitControls />
      </Canvas>
      <div className="absolute bottom-10 p-3 z-3">
        <ThreeColors />
      </div>
    </div>
  );
};
