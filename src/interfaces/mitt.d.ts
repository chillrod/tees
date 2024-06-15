interface MenuItems {
  name: string;
  icon: any;
  tooltip: string;
  separator?: boolean;
  fn: () => void;
}

interface AddCanvasItem {
  type: "text" | "image";
  text?: string;
  image?: string;
}

module.exports = {
  MenuItems,
  AddCanvasItem,
};
