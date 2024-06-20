export enum FabricEvents {
  MouseDown = "mouse:down",
  MouseMove = "mouse:move",
  ObjectModified = "object:modified",
  ObjectSelected = "selection:created",
}

// fabric-extensions.d.ts

export interface ExtendedFabricObject extends fabric.Object {
  id?: string;
  type?: string;
  src?: string;
  charSpacing?: number;
  fontFamily?: string;
  textAlign?: string;
  lineHeight?: number;
  getSrc?: () => string;
}
