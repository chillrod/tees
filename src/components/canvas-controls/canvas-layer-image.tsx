import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import * as Separator from "@radix-ui/react-separator";
import type { ExtendedFabricObject } from "@/types/fabric";
import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { CanvasBoardService } from "@/services/canvas-board.service";

interface Props {
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  formSubmit: (formData: {}) => void;
  item: ExtendedFabricObject;
}
export const CanvasLayerImage = (props: Props) => {
  // const handleCancel = () => {
  //   props.setFormOpen(false);

  //   emitter.emit("canvasLayerItem", undefined);

  //   CanvasLayersService.RemoveCurrentItem();
  // };

  return (
    <>
      <Dialog.Title className="text-2xl">Imagem</Dialog.Title>
      <Dialog.Description className="text-stone-600 mb-2">
        O espaço onde você pode ter mais controle sobre a imagem.
      </Dialog.Description>
      <Separator.Root className="border-b-2 my-2" />
      <div className="w-full h-36 flex bg-red-500">
        <img
          className="w-full h-full object-cover"
          src={props.item.getSrc ? props.item.getSrc() : ""}
          alt="Imagem"
        />
      </div>
      <Form.Root className="flex flex-col gap-4 w-full">
        <Separator.Root className="border-b-2 my-2" />
        <Form.FormField name="remove-background" className="w-full">
          <Button
            onClick={(event) => [
              event.preventDefault(),
              CanvasBoardService.FabricItemCentralize(props.item),
            ]}
            className="w-full"
          >
            Centralizar
          </Button>
        </Form.FormField>
      </Form.Root>
    </>
  );
};
