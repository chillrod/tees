import { emitter } from "@/services/mitt";
import { MenubarLabel } from "@radix-ui/react-menubar";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useEffect } from "react";

export const colors = [
  {
    name: "Preto",
    color: "#000000",
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
    color: "#194519",
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

export const ThreeColors = () => {
  const handleColorChange = (params: {
    taglessColor: string;
    color: string;
  }) => {
    emitter.emit("teeColor", params);
  };

  return (
    <div className="max-w-[450px] overflow-auto grid p-6 gap-2 ">
      <h2 className="font-bold text-lg">T-Shirt Color</h2>
      <div className="flex gap-4 w-full h-full">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex flex-col justify-center gap-2 cursor-pointer hover:opacity-75 ease-in-out duration-200"
          >
            <div
              onClick={() =>
                handleColorChange({
                  taglessColor: color.taglessColor,
                  color: color.color,
                })
              }
              className="w-8 h-8 rounded-full"
              style={{
                backgroundColor: color.color,
              }}
            ></div>
            <span className="text-sm text-center">{color.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
