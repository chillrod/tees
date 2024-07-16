import { emitter } from "@/services/mitt";
import { teeStore } from "@/store/tee";
import { useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { useToast } from "../ui/use-toast";
import { coresStore } from "@/store/cores";

export const ThreeControls = () => {
  const { toast } = useToast();

  const tshirtStore = teeStore();
  const coresState = coresStore();

  const handleColorChange = (params: { cor: string }) => {
    tshirtStore.updateColor(params.cor);
  };

  const baixarCores = useCallback(async () => {
    try {
      const res = await fetch("/api/configuracoes/cores-criacao", {
        method: "GET",
      });

      const cores = await res.json();

      coresState.updateColors(cores);

      tshirtStore.updateColor(cores[0].cor);
    } catch (error) {
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao baixar as cores.",
      });
    }
  }, []);

  useEffect(() => {
    if (coresState.cores.length === 0) {
      baixarCores();
    }
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
      {coresState.cores.length > 0 ? (
        <div className="flex flex-col gap-2 w-full h-full max-h-[400px] overflow-auto">
          {coresState.cores.map((color, index) => (
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
