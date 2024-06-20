import { CanvasLayersService } from "@/services/canvas-layers.service";
import { emitter } from "@/services/mitt";
import type { ExtendedFabricObject } from "@/types/fabric";
import { fabric } from "fabric";

export const createFabricImage = (image?: string) => {
  if (image) {
    const fabricImage = new fabric.Image("", {
      scaleX: 0.1,
      scaleY: 0.1,
      type: "crosshair",
    });

    fabricImage.setSrc(image, () => {
      return fabricImage;
    });

    const editControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      sizeX: 70,
      sizeY: 40,
      offsetY: 50,
      offsetX: 32,
      cursorStyle: "pointer",
      render: (ctx, left, top, _, fabricObject) => {
        const { width, height } = fabricObject as ExtendedFabricObject;
        if (!width || !height) return;

        ctx.save();

        ctx.fillStyle = "#292524";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Editar", left + 1, top + 1);

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

    fabricImage.controls = {
      ...fabricImage.controls,
      edit: editControl,
    };

    fabricImage.type = "image";

    return fabricImage as ExtendedFabricObject;
  }
};
