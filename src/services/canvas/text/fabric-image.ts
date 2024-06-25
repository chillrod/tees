import type { ExtendedFabricObject } from "@/types/fabric";
import { fabric } from "fabric";

export const createFabricImage = (image?: string) => {
  if (image) {
    const fabricImage = new fabric.Image("", {
      scaleX: 0.2,
      scaleY: 0.2,
      type: "crosshair",
    });

    fabricImage.setSrc(image, () => {
      return fabricImage;
    });

    fabricImage.type = "image";

    return fabricImage as ExtendedFabricObject;
  }
};
