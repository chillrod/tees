import { buttonGroup } from "leva";
import { CanvasBoardService } from "../canvas-board.service";
import type { ButtonGroupInput } from "leva/dist/declarations/src/types";
import type { ExtendedFabricObject } from "@/types/fabric";

export const createLayerText = (item: ExtendedFabricObject) => {
  const textModel: TextModels & {
    textAlignOptions: ButtonGroupInput;
    lineSize: number;
    fontFamily: {
      value: string;
      options: string[];
      onChange: (value: string) => void;
    };
  } = {
    // @ts-ignore
    charSpacing: item.get("charSpacing"),
    fill: "#fff",
    itemObject: item,
    _fontSizeMult: 1,
    fontFamily: {
      // @ts-ignore
      value: item.get("fontFamily"),
      options: ["Times New Roman", "Fira Mono", "DM Serif Text", "Anton"],
      onChange: (value) => [
        // @ts-ignore
        item.set("fontFamily", value),
        CanvasBoardService.FabricRerender(),
      ],
    },
    textAlignOptions: buttonGroup({
      label: "Text Align",
      opts: {
        left: () => [
          // @ts-ignore
          item.set("textAlign", "left"),
          CanvasBoardService.FabricRerender(),
        ],
        center: () => [
          // @ts-ignore
          item.set("textAlign", "center"),
          CanvasBoardService.FabricRerender(),
        ],
        right: () => [
          // @ts-ignore
          item.set("textAlign", "right"),
          CanvasBoardService.FabricRerender(),
        ],
      },
    }),
  };

  return textModel;
};
