import type { ExtendedFabricObject } from "@/types/fabric";
import { fabric } from "fabric";
import { emitter } from "@/services/mitt";
import { CanvasLayersService } from "@/services/canvas-layers.service";

export const createTextBox = () => {
  const text = new fabric.Textbox("New Text", {
    fill: "#2e2e2e",
    fontSize: 16,
    lineHeight: 0.8,
    type: "text",
  });

  const editControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: "pointer",

    mouseUpHandler: (_, item) => {
      const { target } = item;

      const updatedItem = target as ExtendedFabricObject;

      if (!target) return false;

      if (CanvasLayersService.currentItem.id === updatedItem.id) {
        CanvasLayersService.RemoveCurrentItem();

        emitter.emit("canvasLayerItem", undefined);

        return false;
      }

      CanvasLayersService.UpdateCurrentItem(updatedItem);

      emitter.emit("canvasLayerItem", target as ExtendedFabricObject);

      return true;
    },
  });

  text.controls = {
    ...text.controls,
    edit: editControl,
  };

  return text as ExtendedFabricObject;
};
