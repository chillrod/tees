import { CanvasBoardService } from "@/services/canvas-board.service";
import { buttonGroup, folder } from "leva";

export const CanvasLayers = {
  createTextModel(item: fabric.Object) {
    const textModel: TextModels = {
      // @ts-ignore
      fontFamily: item.get("fontFamily"),
      // @ts-ignore
      charSpacing: item.get("charSpacing"),
      fill: "#fff",
      itemObject: item,
    };

    return textModel;
  },

  createImageModel(item: fabric.Object) {
    const imageModel: ImageModels = {
      // @ts-ignore
      image: item.get("src"),
    };

    return imageModel;
  },

  UpdateLevaControls(activeObjects?: fabric.Object[]) {
    return activeObjects?.reduce((acc, curr) => {
      const state: { [key: string]: any } = {
        textbox: this.createTextModel(curr),
        image: this.createImageModel(curr),
      };

      return {
        ...acc,
        // @ts-ignore
        [`Layer ${curr.id}`]: folder({
          ...(curr.type ? state[curr.type] : state.textbox),
          " ": buttonGroup({
            delete: () => CanvasBoardService.FabricItemDelete(curr),
          }),
        }),
      };
    }, {});
  },
};
