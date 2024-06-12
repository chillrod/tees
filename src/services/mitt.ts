import mitt from "mitt";

export interface MenuItems {
  name: string;
  icon: any;
  tooltip: string;
  separator?: boolean;
  fn: () => void;
}

type Events = {
  teeColor: string;
  stampColor: string;
  levaPanel?: any;
  addCanvasItem: {
    type: "text" | "image";
    text?: string;
    image?: string;
  };
  levaControls: any;
  updateTexture: any;
  updateCanvasItem: { values: any; itemObject: fabric.Object };
};

export const emitter = mitt<Events>(); // inferred as Emitter<Events>
