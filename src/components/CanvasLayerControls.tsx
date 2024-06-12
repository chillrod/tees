import { emitter } from "@/services/mitt";
import { Leva, useControls } from "leva";
import { useEffect, useMemo, useState } from "react";

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

  emitter.emit("updateCanvasItem", {
    values,
    itemObject: objectValue.schema.itemObject,
  });

  return (
    <div>
      <pre>{JSON.stringify(values, null, "  ")}</pre>
    </div>
  );
};

export const CanvasLayerControls = () => {
  const [controls, setControls] = useState<any>({});

  useEffect(() => {
    emitter.on("levaControls", (controls) => {
      setControls(controls);
    });

    return () => emitter.off("levaControls");
  }, [controls]);

  return (
    <div>
      <Leva
        flat
        titleBar={{
          title: "Layer",
          drag: false,
        }}
      ></Leva>
      {Object.keys(controls).map((key) => (
        <Controls key={key} keyValue={key} objectValue={controls[key]} />
      ))}
    </div>
  );
};
