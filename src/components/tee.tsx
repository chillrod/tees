const defaultImageBackground =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAk8AAAJPCAYAAABlxzBuAAAACXBIWXMAAC4jAAAuIwF4pT92AAAE9WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OTc3NywgMjAyMy8wNi8yNS0yMzo1NzoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjMgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTA2LTE2VDIwOjM2OjU4LTAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA2LTE2VDIwOjM2OjU4LTAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wNi0xNlQyMDozNjo1OC0wMzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzY0ZmZlYjUtN2ViMy00MGIzLWFjZDUtZDg4ZmE3ODFkOTc1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM2NGZmZWI1LTdlYjMtNDBiMy1hY2Q1LWQ4OGZhNzgxZDk3NSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjM2NGZmZWI1LTdlYjMtNDBiMy1hY2Q1LWQ4OGZhNzgxZDk3NSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzY0ZmZlYjUtN2ViMy00MGIzLWFjZDUtZDg4ZmE3ODFkOTc1IiBzdEV2dDp3aGVuPSIyMDI0LTA2LTE2VDIwOjM2OjU4LTAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuMyAoTWFjaW50b3NoKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6M2/akAAAKOklEQVR4nO3WwQ3AIBDAsNL9dz5WIC+EZE+QZ9bMfAAAnPlvBwAAvMQ8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQGCeAAAC8wQAEJgnAIDAPAEABOYJACAwTwAAgXkCAAjMEwBAYJ4AAALzBAAQmCcAgMA8AQAE5gkAIDBPAACBeQIACMwTAEBgngAAAvMEABCYJwCAwDwBAATmCQAgME8AAIF5AgAIzBMAQLAB75oHm5eEAxUAAAAASUVORK5CYII=";

import * as THREE from "three";
import { useEffect, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { emitter } from "@/services/mitt";
import { colors } from "./three-controls/controls";

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

export function Model() {
  const { nodes, materials } = useGLTF("/output3.glb") as GLTFResult;

  const [color, setColor] = useState({
    color: colors[1].color,
    taglessColor: colors[1].taglessColor,
  });

  const [texture, setTexture] = useState(defaultImageBackground);

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

  const textureOnShirt = useTexture(texture);
  textureOnShirt.flipY = false;
  textureOnShirt.offset.set(0.04, -0.2);
  textureOnShirt.anisotropy = 16;
  

  useEffect(() => {
    emitter.on("teeColor", (color) => {
      setColor(color);
    });

    emitter.on("updateTexture", (canvas) => {
      setTexture(canvas);
    });

    return () => {
      emitter.off("updateTexture");
      emitter.off("teeColor");
    };
  }, []);

  return (
    <group dispose={null}>
      <group name="Scene">
        <group
          name="T-shirt_base"
          position={[0.004, 0.5, -0.023]}
          rotation={[Math.PI / 1.9, 0, 0]}
          scale={0.07}
        >
          <group position={[0.439, 2.443, 2.111]} scale={35.77}>
            <mesh
              name="T-shirt_base002"
              castShadow
              receiveShadow
              geometry={nodes["T-shirt_base002"].geometry}
              material={materials["T-shirt_main_tex"]}
              material-color={color.color}
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
              material-color={color.color}
            >
              <meshStandardMaterial
                map={stoneWash}
                attach="material"
                opacity={1}
                blendColor={color.color}
                blending={2}
              ></meshStandardMaterial>
            </mesh>

            <mesh
              name="T-shirt_base002"
              castShadow
              receiveShadow
              geometry={nodes["T-shirt_base002"].geometry}
              material={materials["T-shirt_main_tex"]}
            >
              <meshPhysicalMaterial
                transparent
                attach="material"
                map={textureOnShirt}
              ></meshPhysicalMaterial>
            </mesh>

            <mesh
              name="T-shirt_base002_1"
              castShadow
              receiveShadow
              geometry={nodes["T-shirt_base002_1"].geometry}
              material={materials["T-shirt_collar_tex"]}
              material-color={color.color}
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
              material-color={color.color}
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
              material-color={color.color}
            />
            <mesh
              name="T-shirt_base002_3"
              castShadow
              receiveShadow
              geometry={nodes["T-shirt_base002_3"].geometry}
              material={materials["T-shirt sew_1"]}
              material-color={color.color}
            />
            <mesh
              name="T-shirt_base002_4"
              castShadow
              receiveShadow
              geometry={nodes["T-shirt_base002_4"].geometry}
              material={materials["T-shirt sew_1"]}
              material-color={color.color}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/output3.glb");
