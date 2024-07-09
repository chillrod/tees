import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import jsCookie from "js-cookie";
import type { UserRecord } from "firebase-admin/auth";
import { useToast } from "./ui/use-toast";
import { Skeleton } from "./ui/skeleton";
import { WarningDialog } from "./warning-dialog";

interface Props {
  children: React.ReactNode;
  criacaoId: string;
  usuariosAssociados?: string[];
}

export const AssociarUsuariosDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<UserRecord[]>([]);
  const { toast } = useToast();

  const baixarUsuarios = async () => {
    try {
      setLoading(true);

      const token = jsCookie.get("__session");
      const response = await fetch("/api/user/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const usuarios = await response.json();

      setUsuarios(usuarios.users);
    } catch (error) {
      toast({
        title: "Erro ao baixar usuários",
        description: "Não foi possível baixar usuários.",
      });
    } finally {
      setLoading(false);
    }
  };

  const associarUsuario = async (criacaoId: string, usuarioId: string) => {
    try {
      setLoading(true);

      const token = jsCookie.get("__session");
      await fetch("/api/criacoes/associar-usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: criacaoId,
          userId: usuarioId,
        }),
      });

      toast({
        title: "Sucesso!",
        description: "Usuário associado com sucesso.",
      });
    } catch {
      toast({
        title: "Erro ao associar usuário",
        description: "Não foi possível associar o usuário.",
      });
    } finally {
      setLoading(false);
    }
  };

  const deletarUsuario = async (criacaoId: string, usuarioId: string) => {
    try {
      setLoading(true);

      const token = jsCookie.get("__session");
      await fetch("/api/criacoes/deletar-usuarios-associados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: criacaoId,
          userId: usuarioId,
        }),
      });

      toast({
        title: "Sucesso!",
        description: "Usuário desassociado com sucesso.",
      });
    } catch {
      toast({
        title: "Erro ao desassociar usuário",
        description: "Não foi possível desassociar o usuário.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    baixarUsuarios();
  }, []);

  return (
    <Dialog modal open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {props.children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-stone-200">
        <DialogHeader>
          <DialogTitle>Associar Usuários</DialogTitle>
          <DialogDescription>
            Selecione os usuárioos que deseja associar essa criação.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <>
            <Skeleton className="h-[100px] w-full  bg-stone-200" />
            <Skeleton className="h-[100px] w-full  bg-stone-200" />
            <Skeleton className="h-[100px] w-full  bg-stone-200" />
          </>
        ) : (
          <>
            <ul className="max-h-[300px] overflow-auto flex flex-col gap-6">
              {usuarios.map((usuario) => (
                <li
                  key={usuario.uid}
                  className="flex items-center justify-between border-b-2 border-stone-200 dark:border-stone-700 pb-2"
                >
                  <div>
                    <p>{usuario.displayName}</p>
                    <p>{usuario.email}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      disabled={props.usuariosAssociados?.includes(usuario.uid)}
                      onClick={() =>
                        associarUsuario(props.criacaoId, usuario.uid)
                      }
                    >
                      {props.usuariosAssociados?.includes(usuario.uid)
                        ? "Associado"
                        : "Associar"}
                    </Button>
                    <WarningDialog
                      title="Desassociar usuário"
                      description="Tem certeza que deseja desassociar esse usuário?"
                      func={() => deletarUsuario(props.criacaoId, usuario.uid)}
                    >
                      <Button variant="secondary">Desassociar</Button>
                    </WarningDialog>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
