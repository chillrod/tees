import { Label } from "@radix-ui/react-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

import jsCookie from "js-cookie";
import shortUUID from "short-uuid";
import { Scene } from "../scene";

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
  }, [cores]);

  return (
    <div className="flex flex-col gap-12 relative">
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
      <h2 className="text-sm">Cores Cadastradas</h2>
      {loading ? (
        <></>
      ) : (
        <ul className="grid max-h-[500px] overflow-auto gap-6">
          {cores.map((cor) => {
            return (
              <li className="flex gap-6 items-center" key={cor.id}>
                <div
                  className="w-12 h-12 cursor-pointer"
                  style={{ backgroundColor: cor.cor }}
                  onClick={() => setCorAtual(cor.cor)}
                />
                <Button onClick={() => deletarCor(cor.id)}>Deletar</Button>
              </li>
            );
          })}
        </ul>
      )}
      <div className="absolute right-0 top-0 w-64">
        <Scene isSimple cor={corAtual} />
      </div>
    </div>
  );
};
