import { Label } from "@radix-ui/react-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import * as Separator from "@radix-ui/react-separator";

import jsCookie from "js-cookie";
import shortUUID from "short-uuid";
import { Scene } from "../scene";
import { WarningDialog } from "../warning-dialog";
import { TrashIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AdminConfiguracoes = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [corAtual, setCorAtual] = useState("#313030");
  const [cores, setCores] = useState<{ cor: string; id: string }[]>([]);

  const baixarCores = async () => {
    const token = jsCookie.get("__session");

    try {
      const res = await fetch("/api/configuracoes/cores", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cores = await res.json();

      setCores(cores);
    } catch (error) {
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao baixar as configurações.",
      });
    }
  };

  const deletarCor = async (id: string) => {
    const token = jsCookie.get("__session");

    try {
      setLoading(true);

      await fetch("/api/configuracoes/deletar-cor", {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Sucesso!",
        description: "Cor deletada com sucesso.",
      });

      baixarCores();
    } catch (error) {
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao atualizar as configurações.",
      });
    } finally {
      setLoading(false);
    }
  };

  const cadastrarCor = async (cor: string) => {
    setLoading(true);

    const token = jsCookie.get("__session");

    try {
      await fetch("/api/configuracoes/cores", {
        method: "POST",
        body: JSON.stringify({
          cor: cor,
          id: shortUUID.generate(),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Sucesso!",
        description: "Cor cadastrada com sucesso.",
      });

      baixarCores();
    } catch (error) {
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao atualizar as configurações.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    baixarCores();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="relative grid grid-cols-2 items-center">
          <div className="sticky top-0">
            <h2 className="text-xl font-bold tracking-tight">Cores:</h2>
            <p className="text-sm text-stone-500">
              Gerencie as cores disponíveis para os usuários.
            </p>
          </div>
          <div>
            <h2 className="text-center">Preview</h2>
            <div className="w-full h-full">
              <Scene isSimple cor={corAtual} />
            </div>
          </div>
        </div>
        <Separator.Root className="border-b-2 my-2" />

        <div className="flex gap-12 items-center">
          <h2 className="text-sm">Adicionar nova Cor</h2>
          <Input
            type="color"
            className="w-48"
            value={corAtual}
            onChange={(event) => setCorAtual(event.target.value)}
          />
          <Button onClick={() => cadastrarCor(corAtual)}>Cadastrar</Button>
        </div>
        <h2 className="text-2xl">Cores Cadastradas</h2>

        <Table>
          <TableCaption>Lista de cores cadastradas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Cor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cores.map((cor) => (
              <TableRow key={cor.id}>
                <TableCell>
                  <div
                    onClick={() => setCorAtual(cor.cor)}
                    className="h-8 w-8 cursor-pointer"
                    style={{
                      backgroundColor: cor.cor,
                    }}
                  ></div>
                </TableCell>

                <TableCell className="text-right flex gap-2 justify-end">
                  <WarningDialog
                    title="Deletar Criação"
                    description="Tem certeza que deseja deletar essa criação?"
                    func={() => deletarCor(cor.id)}
                  >
                    <Button size="icon">
                      <TrashIcon />
                    </Button>
                  </WarningDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
