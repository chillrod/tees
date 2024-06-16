import { ContextMenuContent } from "@radix-ui/react-context-menu";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { CanvasBoardService } from "@/services/canvas-board.service";

export const CanvasContextMenu = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-stone-600 z-20 absolute py-1">
        <ContextMenuLabel className="mb-2">Canvas Controls</ContextMenuLabel>
        <ContextMenuItem
          onClick={() => CanvasBoardService.FabricDeleteSelectedObjects()}
        >
          Delete selected items
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
