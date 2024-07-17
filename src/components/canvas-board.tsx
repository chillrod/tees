import { CanvasBoardService } from "@/services/canvas-board.service";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from "react";

import { emitter } from "@/services/mitt";
import { FabricEvents, type ExtendedFabricObject } from "@/types/fabric";
import * as Separator from "@radix-ui/react-separator";

export const gradient =
  "radial-gradient(circle, #515151 1px, rgba(0, 0, 0, 0) 1px)";
export const size = "40px 40px";

export const CanvasBoard = () => {
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    CanvasBoardService.SetEditor(editor);

    editor?.canvas.setDimensions(
      {
        width: 1080,
        height: 1080,
      },
      {
        backstoreOnly: true,
      }
    );
  }, [editor]);

  useEffect(() => {
    editor?.canvas.on(FabricEvents.ObjectModified, () => {
      CanvasBoardService.UpdateTexture();
    });

    editor?.canvas.on("moving", (event) => {
      console.log(event);
    });

    editor?.canvas.on("selection:created", (event) => {
      emitter.emit(
        "toggleEditButton",
        event.selected as ExtendedFabricObject[]
      );
    });

    editor?.canvas.on("selection:cleared", () => {
      emitter.emit("toggleEditButton", []);
    });

    editor?.canvas.on("object:rotating", () => {
      CanvasBoardService.UpdateTexture();
    });

    return () => {
      editor?.canvas.off(FabricEvents.ObjectModified);
      editor?.canvas.off("selection:created");
      editor?.canvas.off("selection:cleared");
      editor?.canvas.off("object:rotating");
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
      <div className="absolute grid grid-cols-2 justify-around w-full text-center text-stone-700 dark:text-stone-500 text-sm">
        <h2>Frente</h2>
        <h2>Costas</h2>
      </div>
      <div
        className="w-full h-[90vh] relative"
        style={{
          backgroundImage: gradient,
          backgroundSize: size,
        }}
      >
        <Separator.Root
          orientation="vertical"
          className="w-0.5 h-full bg-stone-200 dark:bg-stone-800 absolute right-1/2"
          decorative
        />
        <div
          className="w-full h-full absolute"
          // style={{
          //   backgroundImage: "url('/t-shirt-canvas.svg')",
          //   backgroundPosition: "center",
          //   backgroundRepeat: "no-repeat",
          // }}
        >
          <FabricJSCanvas onReady={onReady} className={`aspect-square`} />
        </div>
      </div>
    </>
  );
};
