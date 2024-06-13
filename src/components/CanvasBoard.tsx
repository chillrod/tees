import { emitter } from "@/services/mitt";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import { useEffect } from "react";
import {
  FabricRerender,
  HandleFabricItemAdd,
  HandleFabricItemModified,
} from "@/services/fabric-canvas";

import { UpdateLevaControls } from "@/models/layer-models";

export const CanvasBoard = () => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();

  useEffect(() => {
    const layerControls = UpdateLevaControls(selectedObjects, editor);

    emitter.emit("levaControls", layerControls);
  }, [selectedObjects]);

  useEffect(() => {
    HandleFabricItemModified(editor);
  }, [editor?.canvas]);

  // useEffect(() => {
  //   UpdateTexture(editor);
  // }, [selectedObjects]);

  useEffect(() => {
    emitter.on("addCanvasItem", async (item) => {
      HandleFabricItemAdd(item, editor);
    });

    return () => {
      emitter.off("addCanvasItem");
    };
  }, [editor, fabric]);

  useEffect(() => {
    emitter.on("updateCanvasItem", ({ values, itemObject }) => {
      itemObject.set(values);

      FabricRerender(editor);
    });

    return () => {
      emitter.off("updateCanvasItem");
    };
  }, []);

  return <FabricJSCanvas onReady={onReady} className={`w-full h-full`} />;
};
