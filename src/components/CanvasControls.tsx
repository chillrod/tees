import { ImageIcon, ImagePlusIcon, TypeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { TooltipUI } from "./Tooltip";
import { emitter } from "@/services/mitt";
import { CanvasBoard } from "./CanvasBoard";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import * as Menubar from "@radix-ui/react-menubar";
import { useEffect, useState } from "react";
import { CanvasBoardService } from "@/services/canvas-board.service";

const DrawControls = [
  {
    name: "Text",
    icon: <TypeIcon size={20} />,
    tooltip: "Add Text",
    fn: () => [
      emitter.emit("addCanvasItem", {
        type: "text",
      }),
    ],
  },
  {
    name: "Image",
    icon: <ImageIcon size={20} />,
    tooltip: "Add Image",
    fn: () => [
      emitter.emit("addCanvasItem", {
        type: "image",
      }),
    ],
  },
];

export const CanvasControls = () => {
  const [activeButton, setActiveBtn] = useState<number | null>(null);

  useEffect(() => {
    emitter.on("resetDrawControls", () => [
      setActiveBtn(null),
      CanvasBoardService.CancelFabricItemAdd(),
    ]);

    return () => {
      emitter.off("resetDrawControls", () => setActiveBtn(null));
    };
  }, []);

  return (
    <div className="absolute flex flex-col gap-4">
      <div className="grid gap-4 justify-start w-full">
        {DrawControls.map((item, index) => {
          return (
            <Button
              variant={activeButton === index ? "outline" : "default"}
              className={`
                rounded-lg p-2`}
              onClick={() =>
                activeButton === index
                  ? emitter.emit("resetDrawControls")
                  : [setActiveBtn(index), item.fn()]
              }
            >
              {item.icon}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
