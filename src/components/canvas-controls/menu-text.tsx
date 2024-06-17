import { TypeIcon } from "lucide-react";
import { MenuDefaultButton } from "./menu-default-button";
import type { MenuChildrenProps } from "./menu";
import { createTextBox } from "@/services/canvas/text/fabric-text";
import { CanvasBoardService } from "@/services/canvas-board.service";

interface Props extends MenuChildrenProps {}
export const MenuText = (props: Props) => {
  const handleCreateText = () => {
    const textItem = createTextBox();

    CanvasBoardService.HandleFabricItemAdd(textItem);
  };

  return (
    <MenuDefaultButton
      icon={<TypeIcon />}
      {...props}
      onClick={handleCreateText}
    ></MenuDefaultButton>
  );
};
