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

import * as Form from "@radix-ui/react-form";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import type { UserIdentifier, UserRecord } from "firebase-admin/auth";
import { userStore } from "@/stone/user";

interface Props {
  user: UserRecord;
}

export const NavBarMenu = (props: Props) => {
  const userState = userStore();
  const [form, setForm] = useState({
    pp: 0,
    p: 0,
    m: 0,
    g: 0,
    gg: 0,
    xg: 0,
  });

  const updateForm = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    setForm((prev) => ({ ...prev, [key]: parseInt(event.target.value) }));
  };

  const total = Object.values(form).reduce((acc, curr) => acc + +curr, 0);

  const formSubmit = (formData: {}) => {
    console.log(formData);
  };

  useEffect(() => {
    if (props.user) {
      console.log("🚀 ~ useEffect ~ props.user:", props.user)
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
            <DrawerDescription>Quantidade por Tamanho</DrawerDescription>
            <Form.Root className="grid grid-cols-2 items-center gap-6">
              <Form.Field name="pp">
                <Form.Label>PP</Form.Label>
                <Input
                  type="number"
                  placeholder="PP"
                  value={form.pp}
                  onChange={(event) => updateForm("pp", event)}
                />
              </Form.Field>
              <Form.Field name="p">
                <Form.Label>P</Form.Label>
                <Input
                  type="number"
                  placeholder="P"
                  value={form.p}
                  onChange={(event) => updateForm("p", event)}
                />
              </Form.Field>
              <Form.Field name="m">
                <Form.Label>M</Form.Label>
                <Input
                  type="number"
                  placeholder="M"
                  value={form.m}
                  onChange={(event) => updateForm("m", event)}
                />
              </Form.Field>
              <Form.Field name="g">
                <Form.Label>G</Form.Label>
                <Input
                  type="number"
                  placeholder="G"
                  value={form.g}
                  onChange={(event) => updateForm("g", event)}
                />
              </Form.Field>
              <Form.Field name="gg">
                <Form.Label>GG</Form.Label>
                <Input
                  type="number"
                  placeholder="GG"
                  value={form.gg}
                  onChange={(event) => updateForm("gg", event)}
                />
              </Form.Field>
              <Form.Field name="xg">
                <Form.Label>XG</Form.Label>
                <Input
                  type="number"
                  placeholder="XG"
                  value={form.xg}
                  onChange={(event) => updateForm("xg", event)}
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
            </Form.Root>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={() => formSubmit(form)}>Enviar</Button>
            <DrawerClose>
              <Button
                variant="outline"
                onClick={() =>
                  setForm({
                    pp: 0,
                    p: 0,
                    m: 0,
                    g: 0,
                    gg: 0,
                    xg: 0,
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
