import { emitter } from "@/services/mitt";
import { TooltipUI } from "../tooltip";

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
    <div className="max-w-[450px] overflow-auto grid py-6 gap-1 text-stone-950 dark:text-stone-200">
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

            {/* <span className="text-sm text-center">{color.name}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
};
