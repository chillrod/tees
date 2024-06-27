import { emitter } from "@/services/mitt";
import { TooltipUI } from "../tooltip";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

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

  const handleColorChange = (params: {
    taglessColor: string;
    color: string;
  }) => {
    emitter.emit("teeColor", params);
    setCurrentColor(params.color);
  };

  return (
    <div className="max-w-[450px] overflow-auto grid py-6 gap-6 text-stone-950 dark:text-stone-200 m-6">
      <button
        className="hover:bg-stone-200 flex flex-col justify-center p-3 w-24 rounded-lg cursor:pointer ease-in-out duration-200"
        onClick={() => emitter.emit("centerShirt")}
      >
        <img
          className="mx-auto"
          src="./icon-centralizar.svg"
          alt="Centralizar"
          width={40}
          height={40}
        />
        <span className="text-center">Centralizar</span>
      </button>
      <div>
        <h2 className="font-bold text-lg">
          Studio <span className="bg-yellow-300">Colors</span>
        </h2>
        <span className="text-sm font-normal">
          Escolha a cor da sua camiseta
        </span>
      </div>
      <div className="flex gap-2 w-full h-full">
        {colors.map((color, index) => (
          <div key={index}>
            <TooltipUI text={color.name}>
              <div
                onClick={() =>
                  handleColorChange({
                    taglessColor: color.taglessColor,
                    color: color.color,
                  })
                }
                className="w-8 h-8 rounded-lg border-2 border-stone-200"
                style={{
                  backgroundColor: color.color,
                }}
              ></div>
            </TooltipUI>
          </div>
        ))}
        <Input
          onChange={(event) =>
            handleColorChange({ taglessColor: "", color: event.target.value })
          }
          value={currentColor}
          placeholder="Dinamico"
          type="color"
          className="w-12 h-8 rounded-lg border-2 border-stone-200 cursor-pointer"
        />
      </div>
    </div>
  );
};
