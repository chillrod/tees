import { CanvasBoardService } from "@/services/canvas-board.service";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from "react";

import { emitter } from "@/services/mitt";
import { FabricEvents, type ExtendedFabricObject } from "@/types/fabric";

export const gradient =
  "radial-gradient(circle, #515151 1px, rgba(0, 0, 0, 0) 1px)";
export const size = "40px 40px";

export const CanvasBoard = () => {
  const { editor, onReady } = useFabricJSEditor();

  const getResponsiveValue = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1536) {
      return 2080;
    } else if (windowWidth >= 1280) {
      return 1680;
    } else {
      return 1080;
    }
  };

  useEffect(() => {
    CanvasBoardService.SetEditor(editor);

    const canvasHasObjects = editor?.canvas.getObjects().length;

    if (!canvasHasObjects) {
      CanvasBoardService.LoadCanvasSerialization();
    }

    editor?.canvas.setDimensions(
      {
        width: getResponsiveValue(),
        height: getResponsiveValue(),
      },
      {
        backstoreOnly: true,
      }
    );
  }, [editor]);

  useEffect(() => {
    editor?.canvas.on(FabricEvents.ObjectModified, (e) => {
      CanvasBoardService.UpdateTexture();
    });

    const addToUndoStack = () => {
      CanvasBoardService.canvasLastContext =
        CanvasBoardService.GetCanvasSerialization();
    };

    console.log(CanvasBoardService.canvasLastContext);

    editor?.canvas.on("moving", (event) => {
      console.log(event);
    });

    // editor?.canvas.on("object:modified", addToUndoStack);
    // editor?.canvas.on("object:added", addToUndoStack);
    // editor?.canvas.on("object:removed", addToUndoStack);
    // editor?.canvas.on("object:rotating", addToUndoStack);
    // editor?.canvas.on("object:scaling", addToUndoStack);
    // editor?.canvas.on("object:moving", addToUndoStack);

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
      <div
        className="flex aspect-square"
        style={{
          backgroundImage: gradient,
          backgroundSize: size,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/t-shirt-canvas.svg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <FabricJSCanvas onReady={onReady} className={`aspect-square`} />
        </div>
      </div>
    </>
  );
};
