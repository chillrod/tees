import { emitter } from "@/services/mitt";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, useState } from "react";
const Controls = ({
  keyValue,
  objectValue,
  store,
}: {
  keyValue: string;
  objectValue: any;
  store: any;
}) => {
  const values = useControls(
    `${keyValue}`,
    {
      ...objectValue.schema,
    },
    {
      store: store,
    }
  );

  useEffect(() => {
    emitter.emit("updateCanvasItem", {
      values,
      keyValue,
    });
  });

  return <></>;
};

export const CanvasLevaLayers = () => {
  const store = useCreateStore();

  const [controls, setControls] = useState<any>({});

  useEffect(() => {
    emitter.on("levaControls", (controls) => {
      setControls(controls);
    });

    return () => emitter.off("levaControls");
  }, []);

  return (
    <div>
      <LevaPanel
        store={store}
        key={"leva2"}
        titleBar={{
          title: "Layers",
        }}
        neverHide
        fill
        theme={{
          colors: {
            elevation1: "rgb(28 25 23 / var(--tw-bg-opacity))",
            elevation2: "rgb(28 25 23 / var(--tw-bg-opacity))",
            folderWidgetColor: "transparent",
          },
          sizes: {
            folderTitleHeight: "48px",
          },
        }}
      ></LevaPanel>
      {Object.keys(controls).map((key) => (
        <Controls
          key={key}
          keyValue={key}
          objectValue={controls[key]}
          store={store}
        />
      ))}
    </div>
  );
};
