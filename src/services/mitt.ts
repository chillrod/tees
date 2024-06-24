import type { ExtendedFabricObject } from "@/types/fabric";
import mitt from "mitt";

type Events = {
  teeColor: { color: string; taglessColor: string };
  changeCursorType: string;
  addCanvasItem: AddCanvasItem;
  resetDrawControls: void;
  canvasLayerItem?: ExtendedFabricObject;
  levaControls: any;
  updateTexture: any;
  updateCanvasItem: { formData: {}; item: ExtendedFabricObject };
  imageUpload: HTMLImageElement;
  setActiveMenuItem: number;
  setUserIdentifier: string;
  updateCanvasRef: any;
};

export const emitter = mitt<Events>(); // inferred as Emitter<Events>
