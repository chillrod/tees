import { ContextMenuContent } from "@radix-ui/react-context-menu";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { CanvasBoardService } from "@/services/canvas-board.service";
import { Button } from "./ui/button";

export const CanvasContextMenu = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-stone-100 dark:bg-stone-950 z-20 absolute p-4 shadow-2xl rounded-lg ">
        <ContextMenuLabel className="mb-2">Ações do Canvas</ContextMenuLabel>

        <ContextMenuItem
          onClick={() => CanvasBoardService.FabricDeleteSelectedObjects()}
        >
          <Button variant="outline" className="text-left w-full">
            Deletar seleção
          </Button>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => CanvasBoardService.FabricDeleteAllObjects()}
        >
          <Button variant="outline" className="text-left w-full">
            Limpar Canvas
          </Button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
