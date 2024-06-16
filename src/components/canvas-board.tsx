import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from "react";
import { CanvasBoardService } from "@/services/canvas-board.service";

import { CanvasContextMenu } from "./canvas-context-menu";
import { emitter } from "@/services/mitt";
import { FabricEvents, type ExtendedFabricObject } from "@/types/fabric";

const gradient = "radial-gradient(circle, #515151 1px, rgba(0, 0, 0, 0) 1px)";
const size = "40px 40px";

export const CanvasBoard = () => {
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    CanvasBoardService.SetEditor(editor);
  }, [editor]);

  useEffect(() => {
    editor?.canvas.on(FabricEvents.ObjectModified, () => {
      CanvasBoardService.UpdateTexture();
    });

    return () => {
      editor?.canvas.off(FabricEvents.ObjectModified);
    };
  });

  useEffect(() => {
    emitter.on("updateCanvasItem", ({ values, keyValue }) => {
      const items =
        CanvasBoardService.editor?.canvas.getObjects() as ExtendedFabricObject[];

      const getItem = items.find(
        (item) => item.id === keyValue.replace("Layer ", "")
      );

      if (!getItem) return;

      getItem.set({ ...values });

      CanvasBoardService.FabricRerender();
      CanvasBoardService.UpdateTexture();
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
      <div className="w-full h-full">
        <CanvasContextMenu>
          <FabricJSCanvas onReady={onReady} className={`w-full h-full`} />
        </CanvasContextMenu>
      </div>
    </div>
  );
};
