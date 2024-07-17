import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["T-shirt_base002"]: THREE.Mesh;
    ["T-shirt_base002_1"]: THREE.Mesh;
    ["T-shirt_base002_2"]: THREE.Mesh;
    ["T-shirt_base002_3"]: THREE.Mesh;
    ["T-shirt_base002_4"]: THREE.Mesh;
  };
  materials: {
    ["T-shirt_main_tex"]: THREE.MeshPhysicalMaterial;
    ["T-shirt_collar_tex"]: THREE.MeshPhysicalMaterial;
    ["T-shirt_collar_color_line_inside"]: THREE.MeshPhysicalMaterial;
    ["T-shirt sew_1"]: THREE.MeshPhysicalMaterial;
  };
};

interface Props {
  cor?: string;
}

export function SimpleModel({ cor }: Props) {
  const { nodes, materials } = useGLTF("/output2.glb") as GLTFResult;

  const baseTexture = useTexture(
    "./T-shirt_main_FRONT_2617_BaseColor.1001.png"
  );
  baseTexture.flipY = false;
  baseTexture.anisotropy = 16;

  const normalTexture = useTexture("./T-shirt_main_FRONT_2617_Normal.1001.png");
  normalTexture.flipY = false;
  normalTexture.anisotropy = 16;

  const stoneWash = useTexture("./stonee.png");
  stoneWash.flipY = false;
  stoneWash.anisotropy = 16;
  stoneWash.generateMipmaps = false;

  return (
    <group dispose={null}>
      <group
        name="T-shirt_base"
        position={[0.004, 0.2, -0.023]}
        rotation={[Math.PI / 1.9, 0, 0]}
        scale={2.2}
      >
        <mesh
          name="T-shirt_base002"
          castShadow
          receiveShadow
          geometry={nodes["T-shirt_base002"].geometry}
          material={materials["T-shirt_main_tex"]}
          material-color={cor}
        >
          <meshStandardMaterial
            attach="material"
            map={baseTexture}
            normalMap={normalTexture}
          ></meshStandardMaterial>
        </mesh>

        <mesh
          name="T-shirt_base002"
          castShadow
          receiveShadow
          geometry={nodes["T-shirt_base002"].geometry}
          material={materials["T-shirt_main_tex"]}
          material-color={cor}
        >
          <meshStandardMaterial
            map={stoneWash}
            attach="material"
            opacity={1}
            blendColor={cor}
            blending={2}
          ></meshStandardMaterial>
        </mesh>

        <mesh
          name="T-shirt_base002_1"
          castShadow
          receiveShadow
          geometry={nodes["T-shirt_base002_1"].geometry}
          material={materials["T-shirt_collar_tex"]}
          material-color={cor}
        >
          <meshStandardMaterial
            attach="material"
            map={baseTexture}
            normalMap={normalTexture}
          ></meshStandardMaterial>
        </mesh>

        <mesh
          name="T-shirt_base002_1"
          castShadow
          receiveShadow
          geometry={nodes["T-shirt_base002_1"].geometry}
          material={materials["T-shirt_collar_tex"]}
          material-color={cor}
        >
          <meshStandardMaterial
            map={stoneWash}
            attach="material"
            opacity={1}
            blending={2}
          ></meshStandardMaterial>
        </mesh>
        <mesh
          name="T-shirt_base002_2"
          castShadow
          receiveShadow
          geometry={nodes["T-shirt_base002_2"].geometry}
          material={materials["T-shirt_collar_color_line_inside"]}
          material-color={cor}
        />
        <mesh
          name="T-shirt_base002_3"
          castShadow
          receiveShadow
          geometry={nodes["T-shirt_base002_3"].geometry}
          material={materials["T-shirt sew_1"]}
          material-color={cor}
        />
      </group>
    </group>
  );
}
