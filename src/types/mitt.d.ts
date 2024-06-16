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
  image?: string | ArrayBuffer | null | undefined;
}

module.exports = {
  MenuItems,
  AddCanvasItem,
};
