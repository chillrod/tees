import { userStore } from "@/store/user";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Suspense, useEffect, useState } from "react";
import jsCookie from "js-cookie";
import { CanvasBoardService } from "@/services/canvas-board.service";
import { Skeleton } from "./ui/skeleton";
import { teeStore } from "@/store/tee";

interface Props {
  children: React.ReactNode;
}

export const Creations = (props: Props) => {
  const userState = userStore();
  const [criacoesUsuario, setCriacoesUsuario] = useState([]);
  const [loading, setLoading] = useState(false);
  const teeState = teeStore();

  useEffect(() => {
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

    fetchCriacoes();
  }, []);

  return (
    <Dialog>
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

            <Suspense
              fallback={
                <>
                  <Skeleton className="h-[40px] w-full  bg-stone-200" />
                  <Skeleton className="h-[50px] w-full  bg-stone-200" />
                </>
              }
            >
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
                      <Button
                        variant="ghost"
                        onClick={() => [
                          CanvasBoardService.LoadCanvasSerialization(
                            criacao.canvas
                          ),
                          teeState.updateColor(criacao.teeColor),
                        ]}
                      >
                        Aplicar ao Canvas
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </Suspense>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
