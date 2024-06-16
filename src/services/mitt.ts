import mitt from "mitt";

type Events = {
  teeColor: string;
  changeCursorType: string;
  addCanvasItem: AddCanvasItem;
  resetDrawControls: void;
  levaControls: any;
  updateTexture: any;
  updateCanvasItem: { values: any; itemObject: fabric.Object };
  imageUpload: HTMLImageElement;
  setActiveMenuItem: number;
};

export const emitter = mitt<Events>(); // inferred as Emitter<Events>
