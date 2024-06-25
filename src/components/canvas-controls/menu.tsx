import { useEffect, useState } from "react";
import { emitter } from "@/services/mitt";
import { MenuText } from "./menu-text";

import * as Menubar from "@radix-ui/react-menubar";
import { MenuImage } from "./menu-image";
import { MenuEdit } from "./menu-edit";
import { MenuDefaultButton } from "./menu-default-button";
import { DeleteIcon, TrashIcon } from "lucide-react";
import { CanvasBoard } from "../canvas-board";
import { CanvasBoardService } from "@/services/canvas-board.service";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";

export interface MenuChildrenProps {
  activeButton?: number | null;
  index: number;
  handleActiveClick?: (
    index: number,
    activeButton: number | null,
    onClickFunc?: () => void
  ) => void;
  disabled?: boolean;
  label?: string;
}

export const CanvasControlsMenu = () => {
  const [activeButton, setActiveBtn] = useState<number | null>(null);
  const [editDisabled, setEditDisabled] = useState<boolean>(true);

  const handleActiveClick = (
    index: number,
    activeButton: number | null,
    onClickFunc?: () => void
  ): void => {
    if (activeButton === index) {
      setActiveBtn(null);
      emitter.emit("resetDrawControls");
    } else {
      setActiveBtn(index);

      if (onClickFunc) {
        onClickFunc();
      }
    }
  };

  useEffect(() => {
    emitter.on("toggleEditButton", (selected) => {
      if (selected.length > 1 || selected.length === 0) {
        setEditDisabled(true);
      } else {
        setEditDisabled(false);
      }
    });

    return () => {
      emitter.off("toggleEditButton");
    };
  }, []);

  useEffect(() => {
    emitter.on("resetDrawControls", () => {
      setActiveBtn(null);
    });

    return () => {
      emitter.off("resetDrawControls");
    };
  }, []);

  return (
    <div className="flex gap-12 items-center justify-center p-2">
      <MenuText
        label="Texto"
        activeButton={activeButton}
        index={0}
        handleActiveClick={handleActiveClick}
      />

      <MenuImage
        label="Imagem"
        activeButton={activeButton}
        index={1}
        handleActiveClick={handleActiveClick}
        setActiveBtn={(value) => setActiveBtn(value)}
      />

      <MenuEdit
        label="Editar"
        disabled={editDisabled}
        activeButton={activeButton}
        index={2}
      />

      <MenuDefaultButton
        onClick={() => CanvasBoardService.FabricDeleteAllObjects()}
        icon={<TrashIcon />}
        index={2}
        label="Limpar Desenhos"
      ></MenuDefaultButton>
    </div>
  );
};
