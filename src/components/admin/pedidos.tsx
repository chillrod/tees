import { userStore } from "@/stone/user";
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

export const AdminPedidos = () => {
  const userState = userStore();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const [pedidosCadastrados, setPedidosCadastrados] = useState<PedidoForm[]>(
    []
  );

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
    <div>
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
          <Table>
            <TableCaption>Lista de orçamentos cadastrados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Id Pedido</TableHead>
                <TableHead className="w-[100px]">Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Whatsapp</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidosCadastrados.map((pedido, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {handleIdPedidoReplace(pedido.email, pedido.imagePath)}
                  </TableCell>
                  <TableCell>{pedido.nome}</TableCell>
                  <TableCell>{pedido.email}</TableCell>
                  <TableCell>{pedido.whatsapp}</TableCell>
                  <TableCell className="text-right">
                    <Button
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
