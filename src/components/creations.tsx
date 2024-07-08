import { userStore } from "@/store/user";

import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { CanvasBoardService } from "@/services/canvas-board.service";
import { teeStore } from "@/store/tee";
import jsCookie from "js-cookie";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Props {
  children: React.ReactNode;
}

export const Creations = (props: Props) => {
  const userState = userStore();
  const [criacoesUsuario, setCriacoesUsuario] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const teeState = teeStore();

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

      const criacaoId = window.location.pathname.split("=")[1];

      if (criacaoId === id) {
        window.location.href = "/";
      }

      fetchCriacoes();
    } finally {
      setLoading(false);
    }
  };

  const fetchCriacoes = async () => {
    const token = jsCookie.get("__session");

    try {
      setLoading(true);

      const response = await fetch(
        `/api/criacoes/criar?` +
          new URLSearchParams({
            user: userState.user?.uid || "",
          }).toString(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setCriacoesUsuario(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCriacoes();
  }, [open]);

  return (
    <Dialog open={open} modal onOpenChange={(event) => setOpen(event)}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-stone-200">
        {!criacoesUsuario.length && (
          <DialogHeader>
            <DialogTitle>Você ainda não tem criações.</DialogTitle>
          </DialogHeader>
        )}
        {criacoesUsuario.length > 0 && (
          <>
            <DialogHeader>
              <DialogTitle>
                Criações de {userState.user?.displayName || ""}.
              </DialogTitle>
              <DialogDescription>
                Aqui você pode ver todas as suas criações.
              </DialogDescription>
            </DialogHeader>
            {loading ? (
              <>
                <Skeleton className="h-[100px] w-full  bg-stone-200" />
                <Skeleton className="h-[100px] w-full  bg-stone-200" />
                <Skeleton className="h-[100px] w-full  bg-stone-200" />
              </>
            ) : (
              <ul className="max-h-[400px] overflow-auto flex flex-col gap-2">
                {criacoesUsuario.map((criacao: Criacao, id) => (
                  <li
                    key={id}
                    className="flex items-center justify-between gap-6"
                  >
                    <img
                      className="rounded-lg border-2 border-stone-200 w-full h-24 object-cover"
                      src={criacao.image}
                      alt="Criação usuário"
                      width={100}
                      height={100}
                    />
                    <div className="flex flex-col gap-2">
                      <a href={`/criacao=${criacao.id}`}>
                        <Button disabled={loading}>Abrir no Canvas</Button>
                      </a>
                      <Button
                        disabled={loading}
                        variant="secondary"
                        onClick={() => deletarCriacao(criacao.id)}
                      >
                        Deletar
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
