import type { ExtendedFabricObject } from "@/types/fabric";

export const CanvasLayersService = {
  currentItem: {} as ExtendedFabricObject,

  UpdateCurrentItem(item: ExtendedFabricObject) {
    this.currentItem = item;
  },

  RemoveCurrentItem() {
    this.currentItem = {} as ExtendedFabricObject;
  },
};
