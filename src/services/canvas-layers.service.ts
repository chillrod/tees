import { CanvasBoardService } from "@/services/canvas-board.service";
import type { ExtendedFabricObject } from "@/types/fabric";
import { buttonGroup, folder } from "leva";
import { createLayerText } from "./layers/layers-text";
import { createImageModel } from "./layers/layers-image";

export const CanvasLayersService = {
  UpdateLevaControls(items?: ExtendedFabricObject[]) {
    return items?.reduce((acc, curr) => {
      const state: { [key: string]: any } = {
        text: () => createLayerText(curr),
        image: () => createImageModel(curr),
      };

      return {
        ...acc,
        [`Layer ${curr.id}`]: folder({
          ...(curr.type ? state[curr.type]?.() : state.textbox()),
          " ": buttonGroup({
            delete: () => CanvasBoardService.FabricItemDelete(curr),
          }),
        }),
      };
    }, {});
  },
};
