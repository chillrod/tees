import type { ExtendedFabricObject } from "@/types/fabric";
import { fabric } from "fabric";

export const createTextBox = () => {
  const text = new fabric.Textbox("New Text", {
    fontSize: 16,
    lineHeight: 0.8,
    type: "text",
  });

  return text as ExtendedFabricObject;
};
