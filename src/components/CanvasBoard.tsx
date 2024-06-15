import { emitter } from "@/services/mitt";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import { useEffect } from "react";
import { CanvasBoardService } from "@/services/canvas-board.service";

import { CanvasLayers } from "@/services/canvas-layers.service";
import { keyboardEvents } from "@/services/keyboard-events";
import { ContextMenu, ContextMenuTrigger } from "./ui/context-menu";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { CanvasContextMenu } from "./CanvasContextMenu";
import { CanvasControls } from "./CanvasControls";

const gradient = "radial-gradient(circle, #515151 1px, rgba(0, 0, 0, 0) 1px)";
const size = "40px 40px";

export const CanvasBoard = () => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();

  useEffect(() => {
    CanvasBoardService.SetEditor(editor);
  }, [editor]);

  useEffect(() => {
    const layerControls = CanvasLayers.UpdateLevaControls(selectedObjects);

    emitter.emit("levaControls", layerControls);
  }, [selectedObjects]);

  useEffect(() => {
    CanvasBoardService.HandleFabricItemModified();
  }, [editor?.canvas]);

  // useEffect(() => {
  //   UpdateTexture(editor);
  // }, [selectedObjects]);

  useEffect(() => {
    emitter.on("addCanvasItem", async (item) => {
      CanvasBoardService.HandleFabricItemAdd(item);
    });

    return () => {
      emitter.off("addCanvasItem");
    };
  }, [editor, fabric]);

  useEffect(() => {
    emitter.on("updateCanvasItem", ({ values, itemObject }) => {
      itemObject.set(values);

      CanvasBoardService.FabricRerender();
    });

    return () => {
      emitter.off("updateCanvasItem");
    };
  }, []);

  return (
    <div
      className="flex h-[95vh] w-full  bg-stone-950 relative"
      style={{
        backgroundImage: gradient,
        backgroundSize: size,
      }}
    >
      <div className="z-20">
        <CanvasControls />
      </div>
      <div className="w-full h-full">
        <CanvasContextMenu>
          <FabricJSCanvas onReady={onReady} className={`w-full h-full`} />;
        </CanvasContextMenu>
      </div>
    </div>
  );
};
