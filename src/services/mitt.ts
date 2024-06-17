import type { ExtendedFabricObject } from "@/types/fabric";
import mitt from "mitt";

type Events = {
  teeColor: string;
  changeCursorType: string;
  addCanvasItem: AddCanvasItem;
  resetDrawControls: void;
  levaControls: any;
  updateTexture: any;
  updateCanvasItem: { values: any; keyValue: string };
  imageUpload: HTMLImageElement;
  setActiveMenuItem: number;
};

export const emitter = mitt<Events>(); // inferred as Emitter<Events>
