import type { ExtendedFabricObject } from "@/types/fabric";
import { fabric } from "fabric";

export const createTextBox = () => {
  const text = new fabric.Textbox("New Text", {
    fill: "#fff",
    fontSize: 16,
    lineHeight: 0.80,
    type: "text",
  }) 

  return text as ExtendedFabricObject;
};