import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import * as Separator from "@radix-ui/react-separator";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Slider } from "@/components/ui/slider";
import { CanvasLayersService } from "@/services/canvas-layers.service";
import { emitter } from "@/services/mitt";
import type { ExtendedFabricObject } from "@/types/fabric";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";

interface Props {
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  formSubmit: (formData: {}) => void;
  item: ExtendedFabricObject;
}
export const CanvasLayerText = (props: Props) => {
  const [formData, setFormData] = useState({
    fill: props.item.get("fill") as string,
    fontFamily: props.item.get("fontFamily") as string,
    lineHeight: [props.item.get("lineHeight") as number],
    textAlign: props.item.get("textAlign") as string,
  });

  const handleCancel = () => {
    props.setFormOpen(false);

    emitter.emit("canvasLayerItem", undefined);

    CanvasLayersService.RemoveCurrentItem();
  };

  const alignButtons = [
    {
      name: "left",
      icon: <AlignLeftIcon size={20} />,
      className: `${formData.textAlign === "left" && "bg-stone-200"}`,
    },
    {
      name: "center",
      icon: <AlignCenterIcon size={20} />,
      className: `${formData.textAlign === "center" && "bg-stone-200"}`,
    },
    {
      name: "right",
      icon: <AlignRightIcon size={20} />,
      className: `${formData.textAlign === "right" && "bg-stone-200"}`,
    },
  ];

  return (
    <>
      <Dialog.Title className="text-2xl">Texto</Dialog.Title>
      <Dialog.Description className="text-stone-600 mb-2">
        O espaço para você ser criativo e escrever o que quiser.
      </Dialog.Description>
      <Form.Root className="flex flex-col gap-4">
        <Separator.Root className="border-b-2 my-2" />
        <Form.Field
          name="fill"
          className="flex items-center justify-between gap-6"
        >
          <Form.Label>Cor</Form.Label>
          <Input
            type="color"
            className="w-48"
            value={formData.fill}
            onChange={(e) =>
              setFormData({
                ...formData,
                fill: e.target.value,
              })
            }
          />
        </Form.Field>
        <Form.Field
          name="fontFamily"
          className="flex items-center justify-between gap-6"
        >
          <Form.Label>Fonte</Form.Label>
          <Select
            value={formData.fontFamily}
            onValueChange={(event) => {
              setFormData({
                ...formData,
                fontFamily: event,
              });
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Times New Roman" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem value="Anton">Anton</SelectItem>
            </SelectContent>
          </Select>
        </Form.Field>
        <Form.Field
          name="lineHeight"
          className="flex items-center justify-between gap-6"
        >
          <Form.Label>Altura</Form.Label>
          <Slider
            onValueChange={(event) =>
              setFormData({ ...formData, lineHeight: event })
            }
            defaultValue={formData.lineHeight}
            max={4}
            min={0.6}
            step={0.2}
            className="w-48"
          />
        </Form.Field>
        <Form.Field
          name="textAlign"
          className="flex items-center justify-between gap-6"
        >
          <Form.Label>Orientação</Form.Label>
          <div className="flex gap-1 w-48">
            {alignButtons.map((button, key) => (
              <Button
                key={key}
                variant="link"
                className={button.className}
                onClick={(event) => [
                  event.preventDefault(),
                  setFormData({
                    ...formData,
                    textAlign: button.name,
                  }),
                ]}
              >
                {button.icon}
              </Button>
            ))}
          </div>
        </Form.Field>
        <Form.Submit className="grid justify-end grid-cols-2 gap-2">
          <Button
            variant="link"
            onClick={(event) => [event.preventDefault(), handleCancel()]}
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={(event) => [
              event.preventDefault(),
              props.formSubmit(formData),
            ]}
          >
            Aplicar
          </Button>
        </Form.Submit>
      </Form.Root>
    </>
  );
};
