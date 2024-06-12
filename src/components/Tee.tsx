import { useEffect, useState } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { emitter } from "@/services/mitt";
const react =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8xaUP78TR71TTzNgqAxVHnnydMPSsABD4zw&s";
export function Model() {
  const { nodes, materials } = useGLTF("/tee-model.glb");

  const [texture, setTexture] = useState(react);
  const textureOnShirt = useTexture(texture);

  const [color, setColor] = useState("#282828");

  useEffect(() => {
    emitter.on("teeColor", (color) => {
      setColor(color);
    });

    emitter.on("updateTexture", (texture) => {
      setTexture(texture);
    });

    return () => {
      emitter.off("teeColor");
      emitter.off("updateTexture");
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
        <Decal position={[0, 0, 0]} scale={0.09} rotation={[-1.58, -0, 0]}>
          <meshPhysicalMaterial
            map={textureOnShirt}
            polygonOffset
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
