import { emitter } from "@/services/mitt";
import { Leva, useControls } from "leva";
import { useEffect, useState } from "react";
const Controls = ({
  keyValue,
  objectValue,
}: {
  keyValue: string;
  objectValue: any;
}) => {
  const values = useControls(`${keyValue}`, {
    ...objectValue.schema,
  });

  useEffect(() => {
    emitter.emit("updateCanvasItem", {
      values,
      itemObject: objectValue.schema.itemObject,
    });
  });

  return <></>;
};

export const CanvasLayerControls = () => {
  const [controls, setControls] = useState<any>({});

  useEffect(() => {
    emitter.on("levaControls", (controls) => {
      setControls(controls);
    });

    return () => emitter.off("levaControls");
  }, []);

  return (
    <div>
      <Leva
        titleBar={{
          title: "Layers",
          drag: false,
        }}
        neverHide
        fill
      ></Leva>
      {Object.keys(controls).map((key) => (
        <Controls key={key} keyValue={key} objectValue={controls[key]} />
      ))}
    </div>
  );
};
