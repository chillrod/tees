import { emitter } from "@/services/mitt";
import { teeStore } from "@/store/tee";
import jsCookie from "js-cookie";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { useToast } from "../ui/use-toast";

export const ThreeControls = () => {
  const [cores, setCores] = useState<{ cor: string; id: string }[]>([]);
  const { toast } = useToast();

  const [currentColor, setCurrentColor] = useState("");

  const tshirtStore = teeStore();

  const handleColorChange = (params: { cor: string }) => {
    tshirtStore.updateColor(params.cor);

    setCurrentColor(params.cor);
  };

  const baixarCores = async () => {
    const token = jsCookie.get("__session");

    try {
      const res = await fetch("/api/configuracoes/cores", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cores = await res.json();

      setCores(cores);

      setCurrentColor(cores[0].cor);
      tshirtStore.updateColor(cores[0].cor);
    } catch (error) {
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao baixar as cores.",
      });
    }
  };

  useEffect(() => {
    baixarCores();
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
      {cores.length > 0 ? (
        <div className="flex flex-col gap-2 w-full h-full">
          {cores.map((color, index) => (
            <div key={index}>
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  handleColorChange({
                    cor: color.cor,
                  })
                }
                style={{
                  backgroundColor: color.cor,
                }}
              ></Button>
            </div>
          ))}
        </div>
      ) : (
        <>Carregando cores...</>
      )}
    </div>
  );
};
