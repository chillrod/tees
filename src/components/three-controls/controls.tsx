import { emitter } from "@/services/mitt";
import { TooltipUI } from "../tooltip";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { PaintBucketIcon } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";
import { teeStore } from "@/store/tee";

export const colors = [
  {
    name: "Preto",
    color: "#1c1c1c",
    taglessColor: "#ffffff",
  },
  {
    name: "Branco",
    color: "#ffffff",
    taglessColor: "#000000",
  },
  {
    name: "Cinza",
    color: "#bababa",
    taglessColor: "#ffffff",
  },
  {
    name: "Verde",
    color: "#0f700f",
    taglessColor: "#ffffff",
  },
  {
    name: "Vermelho",
    color: "#a71515",
    taglessColor: "#000000",
  },
  {
    name: "Azul",
    color: "#121248",
    taglessColor: "#ffffff",
  },
];

export const ThreeControls = () => {
  const [currentColor, setCurrentColor] = useState(colors[1].color);
  const tshirtStore = teeStore();

  const handleColorChange = (params: {
    taglessColor: string;
    color: string;
  }) => {
    tshirtStore.updateColor(params.color);

    setCurrentColor(params.color);
  };

  useEffect(() => {
    tshirtStore.updateColor(currentColor);
  }, []);

  return (
    <div className="max-w-[450px] overflow-auto grid gap-6 text-stone-950 dark:text-stone-200 justify-start items-start">
      <ModeToggle />
      <Button
        className="justify-self-start"
        variant="ghost"
        size="icon"
        onClick={() => emitter.emit("centerShirt")}
      >
        <img
          className="mx-auto dark:invert"
          src="./icon-centralizar.svg"
          alt="Centralizar"
          width={30}
          height={30}
        />
      </Button>
      <div className="flex flex-col gap-2 w-full h-full">
        {colors.map((color, index) => (
          <div key={index}>
            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                handleColorChange({
                  taglessColor: color.taglessColor,
                  color: color.color,
                })
              }
              // className="w-8 h-8 rounded-lg border-2 border-stone-200"
              style={{
                backgroundColor: color.color,
              }}
            ></Button>
          </div>
        ))}
        {/* <Input
          onChange={(event) =>
            handleColorChange({ taglessColor: "", color: event.target.value })
          }
          value={currentColor}
          placeholder="Dinamico"
          type="color"
          className="w-10 h-8 rounded-lg border-2 border-stone-200 cursor-pointer"
        /> */}
      </div>
    </div>
  );
};
