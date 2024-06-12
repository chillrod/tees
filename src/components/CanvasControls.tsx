import { TypeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { TooltipUI } from "./Tooltip";
import { emitter } from "@/services/mitt";
import { CanvasBoard } from "./CanvasBoard";

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
      <div className="absolute bottom-0 p-6 flex gap-2">
        <TooltipUI text="Add Text">
          <Button
            asChild
            onClick={() =>
              emitter.emit("addCanvasItem", {
                type: "text",
                text: "Hello, World!",
              })
            }
          >
            <div>
              <TypeIcon size={20} />+
            </div>
          </Button>
        </TooltipUI>
      </div>
    </div>
  );
};
