import { useEffect, useState } from "react";
import {
  Decal,
  DragControls,
  Svg,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { emitter } from "@/services/mitt";

const tigerImage = "./wordart.png";

export function Model() {
  const { nodes, materials } = useGLTF("/tee-model.glb");

  const texture = useTexture(tigerImage);

  const [color, setColor] = useState("#282828");
  const [stampColor, setStampColor] = useState("#2c74cc");

  useEffect(() => {
    emitter.on("teeColor", (color) => {
      setColor(color);
    });

    emitter.on("stampColor", (color) => {
      setStampColor(color);
    });

    return () => {
      emitter.off("teeColor");
      emitter.off("stampColor");
    };
  }, []);

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.stamp.geometry}
        material={materials["Cream Cloth.001"]}
        position={[0.698, -0.208, 0.131]}
        rotation={[1.58, 0.052, -0.031]}
        scale={14.083}
        material-color={color}
      >
        <Decal
          debug
          position={[0, 0, 0]}
          scale={0.09}
          rotation={[1.58, 0.052, 0.031]}
        >
          <meshBasicMaterial
            map={texture}
            polygonOffset
            color={stampColor}
            polygonOffsetFactor={-6}
            transparent
          />
        </Decal>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.tshirt.geometry}
        material={materials["Cream Cloth"]}
        position={[0.698, -0.208, 0.126]}
        rotation={[1.58, 0.052, -0.031]}
        scale={14.083}
        material-color={color}
      />
    </group>
  );
}

useGLTF.preload("/tee-model.glb");
