import { CanvasBoardService } from "@/services/canvas-board.service";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from "react";

import { emitter } from "@/services/mitt";
import { FabricEvents } from "@/types/fabric";
import { CanvasContextMenu } from "./canvas-context-menu";

const gradient = "radial-gradient(circle, #515151 1px, rgba(0, 0, 0, 0) 1px)";
const size = "40px 40px";

export const CanvasBoard = () => {
  const rulers = [0, 5, 10, 15, 20, 25, 30];
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
    emitter.on("updateCanvasItem", ({ formData, item }) => {
      item.set({ ...formData });

      CanvasBoardService.FabricRerender();
      CanvasBoardService.UpdateTexture();
    });

    return () => {
      emitter.off("updateCanvasItem");
    };
  }, []);

  return (
    <>
      <div
        className="grid h-[70vh]"
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
      <div className="w-full justify-around flex border-t-[1px] border-dashed border-t-stone-950">
        {rulers.map((ruler, key) => (
          <span key={key} className="text-stone-950 text-sm text-right mb-2">
            {ruler} cm
          </span>
        ))}
      </div>
    </>
  );
};
