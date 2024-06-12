import { fabric } from "fabric";

const createText = () => {
  return new fabric.Text("Hi", {
    top: 100,
    left: 100,
    fill: "#fff",
    fontSize: 16,
  });
};

export const CreateFabricItem = (item: string) => {
  const state: { [key: string]: fabric.Object } = {
    text: createText(),
  };

  return state[item];
};
