import type { ExtendedFabricObject } from "@/types/fabric";

export const createImageModel = (item: ExtendedFabricObject) => {
  const imageModel: ImageModels = {
    image: item.get("src"),
  };

  return imageModel;
};
