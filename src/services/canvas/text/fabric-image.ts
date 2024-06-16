import type { ExtendedFabricObject } from "@/types/fabric";
import { fabric } from "fabric";

export const createFabricImage = (image?: string) => {
  if (image) {
    const fabricImage = new fabric.Image("", {
      scaleX: 0.1,
      scaleY: 0.1,
      type: 'crosshair',
    });

    fabricImage.setSrc(image, () => {
      return fabricImage;
    });

    return fabricImage as ExtendedFabricObject;
  }
};
