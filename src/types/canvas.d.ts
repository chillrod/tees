interface TextModels {
  fill: string;
  fontSize?: number;
  _fontSizeMult: number;
  itemObject: fabric.Object;
}

interface ImageModels {
  image: string | undefined | ArrayBuffer | null;
}

interface CanvasItem {
  textbox: TextModels;
  image: ImageModels;
}

module.exports = {
  TextModels,
  ImageModels,
  CanvasItem,
};
