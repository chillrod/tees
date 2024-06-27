import type { ExtendedFabricObject } from "@/types/fabric";
import mitt from "mitt";

type Events = {
  teeColor: { color: string; taglessColor: string };
  resetDrawControls: void;
  canvasLayerItem?: ExtendedFabricObject;
  updateTexture: any;
  updateCanvasItem: { formData: {}; item: ExtendedFabricObject };
  centerShirt: void;
  toggleEditButton: ExtendedFabricObject[];
};

export const emitter = mitt<Events>(); // inferred as Emitter<Events>
