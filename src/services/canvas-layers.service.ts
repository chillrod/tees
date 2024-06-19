import { CanvasBoardService } from "@/services/canvas-board.service";
import type { ExtendedFabricObject } from "@/types/fabric";
import { buttonGroup, folder } from "leva";

export const CanvasLayersService = {
  currentItem: {} as ExtendedFabricObject,

  UpdateCurrentItem(item: ExtendedFabricObject) {
    this.currentItem = item;
  },

  RemoveCurrentItem() {
    this.currentItem = {} as ExtendedFabricObject;
  },
};
