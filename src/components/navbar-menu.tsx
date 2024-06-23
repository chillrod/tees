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

import type { PedidoForm } from "@/services/interfaces";
import { userStore } from "@/stone/user";
import * as Form from "@radix-ui/react-form";
import type { UserRecord } from "firebase-admin/auth";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

interface Props {
  user: UserRecord;
}

export const NavBarMenu = (props: Props) => {
  const userState = userStore();
  const { toast } = useToast();

  const whatsappInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<PedidoForm>({
    nome: props.user.displayName,
    email: props.user.email,
    whatsapp: "",
    tamanhos: {
      pp: 0,
      p: 0,
      m: 0,
      g: 0,
      gg: 0,
      xg: 0,
    },
  });

  const updateTamanhoForm = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    setForm((prev) => ({
      ...prev,
      tamanhos: {
        ...prev.tamanhos,
        [key]: +event.target.value,
      },
    }));
  };

  const total = Object.values(form.tamanhos).reduce(
    (acc, curr) => acc + +curr,
    0
  );

  const formSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: PedidoForm
  ) => {
    event.preventDefault();

    if (!formData.whatsapp?.length) {
      whatsappInput?.current?.focus();

      return toast({
        title: "Ops!",
        description:
          "O campo whatsapp é necessário para a gente entrar em contato com você.",
      });
    }

    if (Object.values(formData.tamanhos).every((tamanho) => tamanho === 0)) {
      toast({
        title: "Ops!",
        description: "Você precisa escolher pelo menos um tamanho.",
      });
    }

    try {
      setIsLoading(true);

      await fetch("/api/pedidos/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      toast({
        title: "Pedido enviado!",
        description: "Seu pedido foi enviado com sucesso.",
      });
    } catch (error) {
      console.error("Error:", error);

      formRef.current?.submit();

      toast({
        title: "Ops!",
        description: "Houve um erro ao enviar o pedido, tente novamente",
      });
    } finally {
      setIsLoading(false);

      setForm({
        ...form,
        tamanhos: {
          pp: 0,
          p: 0,
          m: 0,
          g: 0,
          gg: 0,
          xg: 0,
        },
      });
    }
  };

  useEffect(() => {
    if (props.user) {
      userState.updateUser(props.user);
    }
  }, [props.user]);

  return (
    <div className="gap-4 flex">
      <Button variant="link" disabled>
        Seus pedidos
      </Button>
      <Drawer>
        <DrawerTrigger>
          <Button variant="link">Enviar pedido</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-4">
            <div>
              <DrawerTitle>Enviar pedido</DrawerTitle>
              <DrawerDescription>
                Escreva mais detalhes sobre o seu pedido
              </DrawerDescription>
            </div>
            <Form.Root
              className="grid grid-cols-2 items-center gap-6"
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
              <Form.Field name="pp">
                <Form.Label>PP</Form.Label>
                <Input
                  type="number"
                  placeholder="PP"
                  value={form.tamanhos.pp}
                  onChange={(event) => updateTamanhoForm("pp", event)}
                />
              </Form.Field>
              <Form.Field name="p">
                <Form.Label>P</Form.Label>
                <Input
                  type="number"
                  placeholder="P"
                  value={form.tamanhos.p}
                  onChange={(event) => updateTamanhoForm("p", event)}
                />
              </Form.Field>
              <Form.Field name="m">
                <Form.Label>M</Form.Label>
                <Input
                  type="number"
                  placeholder="M"
                  value={form.tamanhos.m}
                  onChange={(event) => updateTamanhoForm("m", event)}
                />
              </Form.Field>
              <Form.Field name="g">
                <Form.Label>G</Form.Label>
                <Input
                  type="number"
                  placeholder="G"
                  value={form.tamanhos.g}
                  onChange={(event) => updateTamanhoForm("g", event)}
                />
              </Form.Field>
              <Form.Field name="gg">
                <Form.Label>GG</Form.Label>
                <Input
                  type="number"
                  placeholder="GG"
                  value={form.tamanhos.gg}
                  onChange={(event) => updateTamanhoForm("gg", event)}
                />
              </Form.Field>
              <Form.Field name="xg">
                <Form.Label>XG</Form.Label>
                <Input
                  type="number"
                  placeholder="XG"
                  value={form.tamanhos.xg}
                  onChange={(event) => updateTamanhoForm("xg", event)}
                />
              </Form.Field>
              <Form.Field name="total">
                <Form.Label>Total</Form.Label>
                <Input
                  readOnly
                  type="number"
                  placeholder="Total"
                  value={total}
                ></Input>
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
                onClick={() =>
                  setForm({
                    ...form,
                    tamanhos: {
                      pp: 0,
                      p: 0,
                      m: 0,
                      g: 0,
                      gg: 0,
                      xg: 0,
                    },
                  })
                }
              >
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
