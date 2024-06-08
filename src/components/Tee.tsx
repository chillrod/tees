import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { emitter } from "@/services/mitt";

export function Model() {
  const { nodes, materials } = useGLTF("/tee-model.glb");

  const [color, setColor] = useState("#282828");

  useEffect(() => {
    emitter.on("teeColor", (color) => {
      setColor(color);
    });

    return () => {
      emitter.off("teeColor");
    };
  }, []);
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes["basic_women_oversized_t-shirt001"].geometry}
        material={materials["Cream Cloth"]}
        position={[0.698, 22, 0.126]}
        rotation={[1.58, 0.052, -0.031]}
        scale={14.083}
        material-color={color}
      />
    </group>
  );
}
