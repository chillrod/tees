import { CanvasBoardService } from "@/services/canvas-board.service";
import { CanvasLayersService } from "@/services/canvas-layers.service";
import { emitter } from "@/services/mitt";
import type { ExtendedFabricObject } from "@/types/fabric";
import * as Dialog from "@radix-ui/react-dialog";
import { CircleX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { CanvasLayerText } from "./canvas-layer-text";
import { CanvasLayerImage } from "./canvas-layer-image";

export const CanvasLayer = () => {
  const divContainer = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<ExtendedFabricObject>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleClose = () => {
    CanvasLayersService.RemoveCurrentItem();
    CanvasBoardService.CanvasDiscardActiveObject();
    setIsFormOpen(false);
    setForm(undefined);
  };

  useEffect(() => {
    emitter.on("canvasLayerItem", (item) => {
      console.log("🚀 ~ emitter.on ~ item:", item)
      if (!item) {
        setIsFormOpen(false);
        setForm(undefined);
        return;
      }

      setForm(item);

      setIsFormOpen(true);
    });

    return () => {
      emitter.off("canvasLayerItem");
    };
  }, []);

  const formSubmit = (formData: {}) => {
    if (form) {
      emitter.emit("updateCanvasItem", { formData, item: form });
    }
  };

  return (
    <>
      <div
        ref={divContainer}
        className={`${
          isFormOpen
            ? "w-[300px] h-full bg-stone-100 rounded-lg p-4 shadow-2xl"
            : ""
        }`}
      ></div>
      <Dialog.Root
        open={isFormOpen}
        modal={false}
        onOpenChange={(event) => (!event ? handleClose() : null)}
      >
        <Dialog.Portal container={divContainer.current}>
          <Dialog.Overlay />
          <Dialog.Content>
            <div className="flex justify-end">
              <Dialog.Close asChild>
                <Button variant="link" onClick={() => handleClose()}>
                  <CircleX size={20} />
                </Button>
              </Dialog.Close>
            </div>
            {form && form.type === "text" && (
              <CanvasLayerText
                setFormOpen={setIsFormOpen}
                formSubmit={formSubmit}
                item={form}
              />
            )}
            {form && form.type === "image" && (
              <CanvasLayerImage
                setFormOpen={setIsFormOpen}
                formSubmit={formSubmit}
                item={form}
              />
            )}
            <div className="flex justify-end">
              <Button
                onClick={() => [
                  CanvasBoardService.FabricItemDelete(form),
                  handleClose(),
                ]}
                variant="link"
                className="p-0 m-0 text-sm"
              >
                Deletar
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
