import { emitter } from "@/services/mitt";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import { useEffect } from "react";
import { CreateFabricItem } from "@/services/fabric-create";
import { UpdateLevaControls } from "@/models/layer-models";
import short from "short-uuid";

export const CanvasBoard = () => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();

  const updateTexture = () => {
    emitter.emit("updateTexture", editor?.canvas.toDataURL());
  };

  useEffect(() => {
    const layerControls = UpdateLevaControls(selectedObjects);

    emitter.emit("levaControls", layerControls);
  }, [selectedObjects]);

  useEffect(() => {
    editor?.canvas.on("object:modified", (event) => {
      updateTexture();
    });
  }, [editor?.canvas]);

  useEffect(() => {
    updateTexture();
  }, [selectedObjects]);

  useEffect(() => {
    emitter.on("addCanvasItem", (item) => {
      const fabricObject = CreateFabricItem(item.type);
      // @ts-ignore
      fabricObject.id = short.generate();

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
