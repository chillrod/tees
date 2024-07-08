import { PencilIcon } from "lucide-react";
import { MenuDefaultButton } from "./menu-default-button";
import type { MenuChildrenProps } from "./menu";
import { CanvasBoardService } from "@/services/canvas-board.service";
import { CanvasLayersService } from "@/services/canvas-layers.service";
import { emitter } from "@/services/mitt";

interface Props extends MenuChildrenProps {}
export const MenuEdit = (props: Props) => {
  const handleOpenMenu = () => {
    const activeItem =
      CanvasBoardService.editor?.canvas.getActiveObjects() || [];

    CanvasLayersService.UpdateCurrentItem(activeItem[0]);

    emitter.emit("canvasLayerItem", activeItem[0]);
  };

  return (
    <MenuDefaultButton
      icon={<PencilIcon className="dark:invert" />}
      {...props}
      onClick={handleOpenMenu}
    ></MenuDefaultButton>
  );
};
