import { folder } from "leva";

export interface TextModels {
  text: string;
  fontFamily: string;
  fill: string;
  itemObject: fabric.Object;
}

export interface CanvasItem {
  text: TextModels;
}

const createTextModel = (item: fabric.Object) => {
  const textModel: TextModels = {
    // @ts-ignore
    text: item.get("text"),
    fontFamily: "Arial",
    fill: "#fff",
    itemObject: item,
  };

  return textModel;
};

export const UpdateLevaControls = (activeObjects?: fabric.Object[]) => {
  return activeObjects?.reduce((acc, curr, index) => {
    const state: { [key: string]: any } = {
      text: createTextModel(curr),
    };

    return {
      ...acc,
      [`Layer ${index}`]: folder({
        ...(curr.type ? state[curr.type] : state.text),
      }),
    };
  }, {});
};
