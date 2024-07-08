import { userStore } from "@/store/user";
import type { UserRecord } from "firebase-admin/auth";
import { useEffect, useRef, useState } from "react";

import jsCookie from "js-cookie";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";
import type { PedidoForm } from "@/services/interfaces";
import { PhoneIcon } from "lucide-react";
import { Input } from "../ui/input";

export const AdminPedidos = () => {
  const userState = userStore();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const [pedidosCadastrados, setPedidosCadastrados] = useState<PedidoForm[]>(
    []
  );

  const [pedidosFiltradosValue, setPedidosFiltradosValue] = useState("");

  const [pedidosFiltrados, setPedidosFiltrados] =
    useState<PedidoForm[]>(pedidosCadastrados);

  const handleIdPedidoReplace = (email: string, imagePath?: string) => {
    if (imagePath) {
      return imagePath.replace(`/${email}/`, "");
    }

    return "";
  };

  const handleVisualizarOrcamento = async (
    email: string,
    imagePath?: string
  ) => {
    try {
      const token = jsCookie.get("__session");

      const uuid = handleIdPedidoReplace(email, imagePath);

      const response = await fetch("/api/pedidos/baixar-arquivos", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, uuid }),
      });

      const url = await response.json();

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = url;
        downloadLinkRef.current.click();
      }
    } catch (error) {
      toast({
        title: "Erro ao baixar arquivo",
        description: "Não foi possível baixar arquivo.",
      });
    }
  };

  useEffect(() => {
    filtrarPedidos(pedidosFiltradosValue);
  }, [pedidosFiltradosValue]);

  const filtrarPedidos = (value: string) => {
    if (value.length === 0) {
      return setPedidosFiltrados(pedidosCadastrados);
    } else {
      const keysToFilter = ["nome", "email", "whatsapp"];

      const pedidosFiltrados = pedidosCadastrados.filter((pedido) => {
        return keysToFilter.some((key) => {
          // @ts-ignore
          return pedido[key]
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase());
        });
      });

      setPedidosFiltrados(pedidosFiltrados);
    }
  };

  const baixarPedidos = async () => {
    try {
      setLoading(true);

      const token = jsCookie.get("__session");
      const response = await fetch("/api/pedidos/listar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const pedidos = await response.json();

      setPedidosCadastrados(pedidos);
      setPedidosFiltrados(pedidos);
    } catch (error) {
      toast({
        title: "Erro ao baixar usuários",
        description: "Não foi possível baixar usuários.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userState.user) {
      baixarPedidos();
    }
  }, [userState.user]);

  return (
    <div className="dark:text-stone-200">
      {loading ? (
        <div className="grid gap-2">
          <Skeleton className="h-[40px] w-full  bg-stone-200" />
          <Skeleton className="h-[50px] w-full  bg-stone-200" />
          <Skeleton className="h-[50px] w-full  bg-stone-200" />
          <Skeleton className="h-[50px] w-full  bg-stone-200" />
          <Skeleton className="h-[50px] w-full  bg-stone-200" />
          <Skeleton className="h-[50px] w-full  bg-stone-200" />
        </div>
      ) : (
        <>
          <Input
            className="w-1/2 mb-6"
            placeholder="Buscar pedidos (id, nome, whatsapp, email)"
            value={pedidosFiltradosValue}
            onChange={(event) => setPedidosFiltradosValue(event.target.value)}
          />
          <Table>
            <TableCaption>Lista de orçamentos cadastrados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Id Pedido</TableHead>
                <TableHead className="w-[100px]">Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Whatsapp</TableHead>
                <TableHead className="text-right">Desenho</TableHead>
                <TableHead className="text-right">Canvas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidosFiltrados.map((pedido, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {handleIdPedidoReplace(pedido.email, pedido.imagePath)}
                  </TableCell>
                  <TableCell>{pedido.nome}</TableCell>
                  <TableCell>{pedido.email}</TableCell>
                  <TableCell>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${
                        pedido.whatsapp
                      }&text=Olá, tudo bem?, vimos seu orçamento de ${handleIdPedidoReplace(
                        pedido.email,
                        pedido.imagePath
                      )} e gostaríamos de te enviar algumas ideias para vc produzir conosco.`}
                      target="_blank"
                    >
                      <Button
                        className="w-full flex items-center gap-2"
                        variant="link"
                      >
                        <PhoneIcon />
                        {pedido.whatsapp}
                      </Button>
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="link"
                      onClick={() =>
                        handleVisualizarOrcamento(
                          pedido.email,
                          pedido.imagePath
                        )
                      }
                    >
                      Visualizar Desenho
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <a href={`/criacao=${pedido.criacao}`} target="_blank">
                      <Button>Abrir no Canvas</Button>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      <a target="_blank" ref={downloadLinkRef} download className="hidden"></a>
    </div>
  );
};
