import { userStore } from "@/store/user";
import type { UserRecord } from "firebase-admin/auth";
import { useEffect, useState } from "react";

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

export const AdminUsuarios = () => {
  const userState = userStore();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const [usuariosCadastros, setUsuariosCadastros] = useState<UserRecord[]>([]);

  const handleTornarAdministrador = async (usuario: UserRecord) => {
    try {
      const response = await fetch("/api/user/tornar-administrador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: usuario.uid }),
      });

      toast({
        title: response.ok
          ? "Usuário agora é administrador"
          : "Erro ao tornar administrador",
      });
    } catch (error) {
      toast({
        title: "Erro ao tornar administrador",
        description: "Não foi possível tornar administrador.",
      });
    } finally {
      baixarUsuarios();
    }
  };

  const baixarUsuarios = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/user/usuarios");

      const usuarios = await response.json();

      setUsuariosCadastros(usuarios.users);
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
    baixarUsuarios();
  }, []);

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
        <div>
          <Table>
            <TableCaption>Lista de usuários cadastrados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuariosCadastros.map((usuario, index) => (
                <TableRow key={index}>
                  <TableCell>{usuario.displayName}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    {Object.keys(usuario.customClaims ?? { Usuario: true }).map(
                      (key) => key
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => handleTornarAdministrador(usuario)}>
                      Tornar Administrador
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
