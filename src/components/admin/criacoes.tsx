import { userStore } from "@/store/user";
import { useEffect, useState } from "react";

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
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const AdminCriacoes = () => {
  const userState = userStore();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const [pedidosCadastrados, setPedidosCadastrados] = useState<Criacao[]>([]);

  const [criacoesFiltradasValue, setCriacoesFiltradasValue] = useState("");

  const [criacoesFiltradas, setCriacoesFiltradas] =
    useState<Criacao[]>(pedidosCadastrados);

  useEffect(() => {
    filtrarCriacoes(criacoesFiltradasValue);
  }, [criacoesFiltradasValue]);

  const filtrarCriacoes = (value: string) => {
    if (value.length === 0) {
      return setCriacoesFiltradas(pedidosCadastrados);
    } else {
      const keysToFilter = ["user", "id"];

      const criacoesFiltradas = pedidosCadastrados.filter((pedido) => {
        return keysToFilter.some((key) => {
          // @ts-ignore
          return pedido?.[key]
            ?.toLocaleLowerCase()
            .includes(value.toLocaleLowerCase());
        });
      });

      setCriacoesFiltradas(criacoesFiltradas);
    }
  };

  const deletarCriacao = async (id: string) => {
    const token = jsCookie.get("__session");

    try {
      setLoading(true);

      await fetch(
        `/api/criacoes/deletar?` +
          new URLSearchParams({
            id,
          }).toString(),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      baixarCriacoes();
    } finally {
      setLoading(false);
    }
  };

  const baixarCriacoes = async () => {
    try {
      setLoading(true);

      const token = jsCookie.get("__session");
      const response = await fetch("/api/criacoes/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const criacoes = await response.json();

      setPedidosCadastrados(criacoes);
      setCriacoesFiltradas(criacoes);
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
      baixarCriacoes();
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
            placeholder="Buscar Criacoes (id, nome do usuário)"
            value={criacoesFiltradasValue}
            onChange={(event) => setCriacoesFiltradasValue(event.target.value)}
          />
          <Table>
            <TableCaption>Lista de criações cadastradas</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Id Criação</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Cor Camiseta</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criacoesFiltradas.map((criacao, index) => (
                <TableRow key={index}>
                  <TableCell>{criacao.id}</TableCell>
                  <TableCell>{criacao.user}</TableCell>
                  <TableCell>
                    <div
                      className="h-8 w-8"
                      style={{
                        backgroundColor: criacao.teeColor,
                      }}
                    ></div>
                  </TableCell>
                  <TableCell>
                    <img
                      className="h-12 w-12 object-cover border-2 border-stone-200 rounded-lg"
                      src={criacao.image}
                      alt="Criacao"
                      width={500}
                      height={500}
                    ></img>
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <a href={`/criacao=${criacao.id}`} target="_blank">
                      <Button>Abrir no Canvas</Button>
                    </a>

                    <Button onClick={() => deletarCriacao(criacao.id)}>
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};
