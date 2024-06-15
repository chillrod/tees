interface TextModels {
  fontFamily: string;
  fill: string;
  fontSize?: number;
  charSpacing?: number;
  itemObject: fabric.Object;
}

interface ImageModels {
  src: string;
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
