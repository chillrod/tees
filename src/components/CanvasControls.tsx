import { ImageIcon, ImagePlusIcon, TypeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { TooltipUI } from "./Tooltip";
import { emitter } from "@/services/mitt";
import { CanvasBoard } from "./CanvasBoard";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import * as Menubar from "@radix-ui/react-menubar";

const gradient = "radial-gradient(circle, #515151 1px, rgba(0, 0, 0, 0) 1px)";
const size = "40px 40px";

export const CanvasControls = () => {
  return (
    <div
      className="flex h-[95vh] relative bg-stone-950 rounded-lg"
      style={{
        backgroundImage: gradient,
        backgroundSize: size,
      }}
    >
      <div className="w-full h-full">
        <CanvasBoard />
      </div>
      <div className="absolute bottom-0">
        <Menubar.Root className="bg-stone-100 rounded-lg flex p-2 gap-6">
          <Menubar.Menu>
            <Menubar.Trigger
              onClick={() => [
                emitter.emit("addCanvasItem", {
                  type: "text",
                }),
              ]}
            >
              <TypeIcon size={20} />
            </Menubar.Trigger>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>
              <ImageIcon size={20} />
            </Menubar.Trigger>
          </Menubar.Menu>
          {/* <Menubar>
            <MenubarTrigger asChild>
              <Button
                className="w-full"
                variant="default"
                onClick={() => [
                  emitter.emit("addCanvasItem", {
                    type: "text",
                  }),
                ]}
              >
                <TypeIcon size={20} />+
              </Button>
            </MenubarTrigger>
          </Menubar> */}
        </Menubar.Root>
      </div>
      {/* <div className="absolute bottom-0 p-6 flex gap-2">
        <TooltipUI text="Add Text">
          <Button
            variant="default"
            asChild
            onClick={() => [
              emitter.emit("addCanvasItem", {
                type: "text",
              }),
            ]}
          >
            <div>
              <TypeIcon size={20} />+
            </div>
          </Button>
        </TooltipUI>
      </div> */}
    </div>
  );
};
