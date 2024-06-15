import mitt from "mitt";

type Events = {
  teeColor: string;
  stampColor: string;
  levaPanel?: any;
  changeCursorType: string;
  addCanvasItem: AddCanvasItem;
  resetDrawControls: void;
  levaControls: any;
  updateTexture: any;
  updateCanvasItem: { values: any; itemObject: fabric.Object };
};

export const emitter = mitt<Events>(); // inferred as Emitter<Events>
