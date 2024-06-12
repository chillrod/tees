import { emitter } from "@/services/mitt";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import { useEffect } from "react";
import { CreateFabricItem } from "@/services/fabric-create";
import { UpdateLevaControls } from "@/models/layer-models";

export const CanvasBoard = () => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();

  useEffect(() => {
    const layerControls = UpdateLevaControls(selectedObjects);

    emitter.emit("levaControls", layerControls);
  }, [selectedObjects]);

  useEffect(() => {
    emitter.on("addCanvasItem", (item) => {
      const fabricObject = CreateFabricItem(item.type);

      editor?.canvas?.add(fabricObject);
    });

    return () => emitter.off("addCanvasItem");
  }, [editor, fabric]);

  useEffect(() => {
    emitter.on("updateCanvasItem", ({ values, itemObject }) => {
      itemObject.set(values);

      editor?.canvas?.requestRenderAll();
    });
  }, []);

  return <FabricJSCanvas onReady={onReady} className="w-full h-full" />;
};
