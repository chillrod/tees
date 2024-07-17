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

import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Props {
  children: React.ReactNode;
}

export const SuasCriacoesAssociadas = (props: Props) => {
  const userState = userStore();
  const [criacoesUsuario, setCriacoesUsuario] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCriacoes = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/criacoes/criacoes-user-associados?` +
          new URLSearchParams({
            user: userState.user?.uid || "",
          }).toString(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
    if (open) {
      fetchCriacoes();
    }
  }, [open]);

  return (
    <Dialog open={open} modal onOpenChange={(event) => setOpen(event)}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-stone-200">
        {!criacoesUsuario.length && (
          <DialogHeader>
            <DialogTitle>Você ainda não tem criações associadas.</DialogTitle>
          </DialogHeader>
        )}
        {criacoesUsuario.length > 0 && (
          <>
            <DialogHeader>
              <DialogTitle>
                Criações associadas de {userState.user?.displayName || ""}.
              </DialogTitle>
              <DialogDescription>
                Aqui você pode ver todas as suas criações que foram associadas
                por nossa equipe administrativa.
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
                  <li key={id} className="flex flex-col gap-2">
                    Associador por: {criacao.user}
                    <div className="flex items-center justify-between gap-6">
                      <img
                        className="rounded-lg border-2 border-stone-200 w-full h-24 object-cover"
                        src={criacao.image}
                        alt="Criação usuário"
                        width={100}
                        height={100}
                      />
                      <div className="flex flex-col gap-2">
                        {/* <Button
                          disabled={loading}
                          onClick={() => aprovarCriacao(criacao)}
                        >
                          <ThumbsUpIcon />
                          Aprovar
                        </Button> */}
                        <a href={`/criacao=${criacao.id}`}>
                          <Button disabled={loading}>Abrir no Canvas</Button>
                        </a>
                      </div>
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
