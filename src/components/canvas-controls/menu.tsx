import { useEffect, useState } from "react";
import { emitter } from "@/services/mitt";
import { MenuText } from "./menu-text";

import { MenuImage } from "./menu-image";
import { MenuEdit } from "./menu-edit";
import { MenuDefaultButton } from "./menu-default-button";
import { EraserIcon, SaveIcon, UndoIcon } from "lucide-react";
import { CanvasBoardService } from "@/services/canvas-board.service";
import { useToast } from "../ui/use-toast";

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
  const { toast } = useToast();

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
    <div className="flex gap-6 items-center justify-center p-2 relative z-30">
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
{/* 
      <MenuDefaultButton
        onClick={() => CanvasBoardService.FabricDeleteAllObjects()}
        icon={<UndoIcon />}
        index={3}
        label="Refazer"
      ></MenuDefaultButton> */}

      <MenuDefaultButton
        onClick={() => CanvasBoardService.FabricDeleteAllObjects()}
        icon={<EraserIcon />}
        index={3}
        label="Limpar"
      ></MenuDefaultButton>

      <MenuDefaultButton
        onClick={() => [
          CanvasBoardService.SaveCanvasSerialization(),
          toast({
            title: "Sucesso",
            description: "Desenho foi salvo para rascunho!",
          }),
        ]}
        icon={<SaveIcon />}
        index={4}
        label="Salvar"
      ></MenuDefaultButton>
    </div>
  );
};
