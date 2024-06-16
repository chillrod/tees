import { buttonGroup } from "leva";
import { CanvasBoardService } from "../canvas-board.service";
import type { ButtonGroupInput } from "leva/dist/declarations/src/types";
import type { ExtendedFabricObject } from "@/types/fabric";

export const createLayerText = (item: ExtendedFabricObject) => {
  const textModel = {
    fill: "#fff",
    lineHeight: item.get("lineHeight"),
    fontFamily: {
      value: item.get("fontFamily"),
      options: ["Times New Roman", "Fira Mono", "DM Serif Text", "Anton"],
      onChange: (value: string) => [
        item.set("fontFamily", value),
        CanvasBoardService.FabricRerender(),
      ],
    },
    textAlignOptions: buttonGroup({
      label: "Text Align",
      opts: {
        left: () => [
          item.set("textAlign", "left"),
          CanvasBoardService.FabricRerender(),
        ],
        center: () => [
          item.set("textAlign", "center"),
          CanvasBoardService.FabricRerender(),
        ],
        right: () => [
          item.set("textAlign", "right"),
          CanvasBoardService.FabricRerender(),
        ],
      },
    }),
  };

  return textModel;
};
