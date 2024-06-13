import { FabricItemDelete } from "@/services/fabric-canvas";
import type { FabricJSEditor } from "fabricjs-react";
import { buttonGroup, folder } from "leva";

export interface TextModels {
  fontFamily: string;
  fill: string;
  itemObject: fabric.Object;
}

export interface ImageModels {
  src: string;
}

export interface CanvasItem {
  textbox: TextModels;
  image: ImageModels;
}

const createTextModel = (item: fabric.Object) => {
  const textModel: TextModels = {
    // @ts-ignore
    fontFamily: "Arial",
    fill: "#fff",
    itemObject: item,
  };

  return textModel;
};

const createImageModel = (item: fabric.Object) => {
  const imageModel: ImageModels = {
    // @ts-ignore
    image: item.get("src"),
  };

  return imageModel;
};

export const UpdateLevaControls = (
  activeObjects?: fabric.Object[],
  editor?: FabricJSEditor
) => {
  return activeObjects?.reduce((acc, curr) => {
    const state: { [key: string]: any } = {
      textbox: createTextModel(curr),
      image: createImageModel(curr),
    };

    return {
      ...acc,
      // @ts-ignore
      [`Layer ${curr.id}`]: folder({
        ...(curr.type ? state[curr.type] : state.textbox),
        " ": buttonGroup({
          delete: () => FabricItemDelete(curr, editor),
        }),
      }),
    };
  }, {});
};
