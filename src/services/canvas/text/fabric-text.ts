import type { ExtendedFabricObject } from "@/types/fabric";
import { fabric } from "fabric";

export const createTextBox = () => {
  const text = new fabric.Textbox("Novo Texto", {
    fontSize: 40,
    lineHeight: 0.8,
    type: "i-text",
    width: 200,
  });

  return text as ExtendedFabricObject;
};
