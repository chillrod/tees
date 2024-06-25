import { CanvasBoardService } from "@/services/canvas-board.service";
import type { PedidoForm } from "@/services/interfaces";
import * as Form from "@radix-ui/react-form";
import type { UserRecord } from "firebase-admin/auth";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

interface Props {
  user: UserRecord;
}
export const NavBarMenuForm = (props: Props) => {
  const { toast } = useToast();

  const whatsappInput = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [form, setForm] = useState<PedidoForm>({
    nome: props.user.displayName,
    email: props.user.email,
    whatsapp: "",
    canvas: "",
    sobre: "",
  });

  const applyValidations = (formData: PedidoForm) => {
    if (!formData.whatsapp?.length) {
      whatsappInput?.current?.focus();

      toast({
        title: "Ops!",
        description:
          "O campo whatsapp é necessário para a gente entrar em contato com você.",
      });

      return false;
    }

    return true;
  };

  const formSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: PedidoForm
  ) => {
    event.preventDefault();

    const hasSucessedValidations = applyValidations(formData);

    if (!hasSucessedValidations) {
      return;
    }

    try {
      setIsLoading(true);
      const canvas = CanvasBoardService.GetCanvasImage();

      const res = await fetch("/api/pedidos/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          canvas,
        }),
      });

      if (res.status !== 200) {
        return toast({
          title: "Ops!",
          description: "Ocorreu um erro ao enviar seu orçamento.",
        });
      }

      setForm({
        ...form,
        whatsapp: "",
        canvas: "",
        sobre: "",
      });

      toast({
        title: "Orçamento enviado!",
        description: "Seu orçamento foi enviado com sucesso.",
      });

      setOpenDrawer(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerTrigger asChild>
        <Button variant="link" onClick={() => setOpenDrawer(true)}>
          Realizar orçamento
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-4">
          <div>
            <DrawerTitle>Solicitar orçamento</DrawerTitle>
            <DrawerDescription>
              Preencha o formulário abaixo para solicitar um orçamento, entraremos em contato com você o mais rápido possível.
            </DrawerDescription>
          </div>
          <Form.Root
            className="flex flex-col gap-6"
            onSubmit={async (event) => formSubmit(event, form)}
          >
            <Form.Field name="whatsapp">
              <Form.Label>Whatsapp *</Form.Label>
              <Input
                required
                ref={whatsappInput}
                placeholder="Whatsapp"
                value={form.whatsapp}
                onChange={(event) =>
                  setForm({ ...form, whatsapp: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field name="about">
              <Form.Label>Sobre o pedido</Form.Label>
              <Textarea
                placeholder="Sobre a sua criação..."
                value={form.sobre}
                onChange={(event) =>
                  setForm({
                    ...form,
                    sobre: event.target.value,
                  })
                }
              />
            </Form.Field>

            <Form.Submit className="grid w-full col-span-2">
              <Button className="w-full" disabled={isLoading}>
                Enviar
              </Button>
            </Form.Submit>
          </Form.Root>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => [setOpenDrawer(false)]}
            >
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
