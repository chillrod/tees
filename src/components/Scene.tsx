import {
  ContactShadows,
  OrbitControls,
  SpotLight,
  Stage,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model } from "./tee.tsx";
import { ThreeControlsLevaInput } from "./three-controls/leva-input";

export const Scene = () => {
  return (
    <div className="h-full w-full relative">
      <Canvas shadows className="bg-stone-950 rounded-lg h-full w-full">
        <ambientLight intensity={5} />

        <SpotLight
          penumbra={0.5}
          position={[5, 2, 0]}
          intensity={0.5}
          angle={0.5}
          color="#424242"
          castShadow
        />

        <ContactShadows
          position={[0, -1.5, 0]}
          scale={10}
          far={5}
          blur={3}
          rotation={[Math.PI / 2, 0, 0]}
          color="#4b4b4b"
        />
        <Stage>
          <Model />
        </Stage>

        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -0.8, 0]}
          opacity={0.25}
          width={10}
          height={10}
          blur={1}
          far={1}
        />

        <OrbitControls />
      </Canvas>
      <div className="absolute bottom-0">
        <ThreeControlsLevaInput />
      </div>
    </div>
  );
};
