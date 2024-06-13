import mitt from "mitt";

export interface MenuItems {
  name: string;
  icon: any;
  tooltip: string;
  separator?: boolean;
  fn: () => void;
}
export interface AddCanvasItem {
  type: "text" | "image";
  text?: string;
  image?: string;
}

type Events = {
  teeColor: string;
  stampColor: string;
  levaPanel?: any;
  changeCursorType: string;
  addCanvasItem: AddCanvasItem;
  levaControls: any;
  updateTexture: any;
  updateCanvasItem: { values: any; itemObject: fabric.Object };
};

export const emitter = mitt<Events>(); // inferred as Emitter<Events>
