import type { ExtendedFabricObject } from "@/types/fabric";

export const createImageModel = (item: ExtendedFabricObject) => {
  const imageModel = {
    image: item.getSrc ? item.getSrc() : "",
  };

  return imageModel;
};
