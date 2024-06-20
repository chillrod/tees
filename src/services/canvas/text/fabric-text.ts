import type { ExtendedFabricObject } from "@/types/fabric";
import { fabric } from "fabric";
import { emitter } from "@/services/mitt";
import { CanvasLayersService } from "@/services/canvas-layers.service";

export const createTextBox = () => {
  const text = new fabric.Textbox("New Text", {
    fontSize: 16,
    lineHeight: 0.8,
    type: "text",
  });

  const editControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    sizeX: 70,
    sizeY: 40,
    offsetY: 5,
    offsetX: 30,
    cursorStyle: "pointer",
    render: (ctx, left, top, _, fabricObject) => {
      const { width, height } = fabricObject as ExtendedFabricObject;
      if (!width || !height) return;

      ctx.save();

      ctx.fillStyle = "#292524";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Editar", left + width / 2, top + height / 2);

      ctx.restore();
    },

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
