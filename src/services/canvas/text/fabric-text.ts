import type { ExtendedFabricObject } from "@/types/fabric";
import { fabric } from "fabric";

export const createTextBox = () => {
  const responsiveText: { [key: string]: number } = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    "2xl": 72,
  };

  const responsiveValue = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1536) {
      return responsiveText["2xl"];
    } else if (windowWidth >= 1280) {
      return responsiveText.xl;
    } else if (windowWidth >= 1024) {
      return responsiveText.lg;
    } else if (windowWidth >= 768) {
      return responsiveText.md;
    } else if (windowWidth >= 640) {
      return responsiveText.sm;
    } else {
      return responsiveText.xs;
    }
  };

  const text = new fabric.Textbox("Novo Texto", {
    fontSize: responsiveValue(),
    lineHeight: 0.8,
    type: "i-text",
  });

  return text as ExtendedFabricObject;
};
