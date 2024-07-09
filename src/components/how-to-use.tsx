import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CanvasBoardService } from "@/services/canvas-board.service";
import { sampleCanvas } from "@/services/sample-canvas";

interface Props {
  children: React.ReactNode;
}

export const ComoUsar = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleAdicionarExemplo = () => {
    CanvasBoardService.LoadCanvasSerialization(sampleCanvas);

    setOpen(false);
  };

  return (
    <Dialog modal open={open} onOpenChange={(event) => setOpen(event)}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] dark:text-stone-200">
        <DialogHeader>
          <DialogTitle>Como Usar.</DialogTitle>
          <DialogDescription>
            Veja como é fácil criar suas próprias estampas com o Studio Canvas.
          </DialogDescription>
          <div className="flex flex-col gap-2 max-h-[400px] overflow-auto">
            <img
              src="/studio.svg"
              alt="Studio Estampar"
              className="w-24 h-24 mx-auto mt-6"
            />

            <div>
              <h2 className="font-bold">Canvas:</h2>
              <span className="text-sm opacity-75">
                O Studio Canvas é uma ferramenta online que permite a criação de
                estampas personalizadas para camisetas, feito para designers e
                entusiastas da moda.
              </span>
            </div>
            <div>
              <h2 className="font-bold">Criação de Textos:</h2>
              <span className="text-sm opacity-75">
                Para criar um texto, basta clicar no botão "Texto" e digitar o
                que deseja. Você pode alterar a fonte, tamanho e cor do texto.
              </span>
            </div>
            <div>
              <h2 className="font-bold">Adicionar Imagens:</h2>
              <span className="text-sm opacity-75">
                Para adicionar uma imagem, clique no botão "Imagem" e faça o
                upload do arquivo. Você pode redimensionar e rotacionar a
                imagem.
              </span>
            </div>
            <div>
              <h2 className="font-bold">Salvar:</h2>
              <span className="text-sm opacity-75">
                Para salvar a sua criação, clique no botão "Salvar", a sua
                criação estará pronta para ser visualizada por nossa equipe.
                Você também pode requisitar que nossa equipe atue como criador
                para você. E associe a sua criação ao seu usuário do nosso
                sistema, posteriormente aprovando o resultado ou não.
              </span>
            </div>
            <div>
              <h2 className="font-bold">Orçamento:</h2>
              <span className="text-sm opacity-75">
                Após a criação da sua estampa, você pode solicitar um orçamento
                para a produção da sua camiseta. Nossa equipe entrará em contato
                com você para finalizar o pedido em até 48 horas. E não é
                preciso se preocupar com a qualidade da estampa nem envio de
                arquivos/imagens, pois utilizamos as melhores técnicas de
                estamparia do mercado.
              </span>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="flex items-center gap-2">
          Ficou interessado?
          <Button onClick={() => handleAdicionarExemplo()}>
            Comece com um exemplo.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
