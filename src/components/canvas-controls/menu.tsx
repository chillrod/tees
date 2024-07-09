import { emitter } from "@/services/mitt";
import { useCallback, useEffect, useState } from "react";
import { MenuText } from "./menu-text";

import { CanvasBoardService } from "@/services/canvas-board.service";
import { teeStore } from "@/store/tee";
import { userStore } from "@/store/user";
import jsCookie from "js-cookie";
import { EraserIcon, SaveIcon } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { MenuDefaultButton } from "./menu-default-button";
import { MenuEdit } from "./menu-edit";
import { MenuImage } from "./menu-image";
import shortUUID from "short-uuid";

export interface MenuChildrenProps {
  activeButton?: number | null;
  index: number;
  handleActiveClick?: (
    index: number,
    activeButton: number | null,
    onClickFunc?: () => void
  ) => void;
  disabled?: boolean;
  label?: string;
}

export const CanvasControlsMenu = () => {
  const [activeButton, setActiveBtn] = useState<number | null>(null);
  const [editDisabled, setEditDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCriacao, setIsCriacao] = useState<boolean>(false);
  const { toast } = useToast();
  const userState = userStore();
  const teeState = teeStore();

  const handleActiveClick = (
    index: number,
    activeButton: number | null,
    onClickFunc?: () => void
  ): void => {
    if (activeButton === index) {
      setActiveBtn(null);
      emitter.emit("resetDrawControls");
    } else {
      setActiveBtn(index);

      if (onClickFunc) {
        onClickFunc();
      }
    }
  };

  const handleAtualizarCriacao = useCallback(
    async (id: string) => {
      const canvasSerialization = CanvasBoardService.GetCanvasSerialization();
      const canvasSmallImage = CanvasBoardService.GetCanvasSmallImage();

      const token = jsCookie.get("__session");

      try {
        const params: Criacao = {
          id,
          canvas: canvasSerialization,
          userId: userState.user?.uid,
          user: userState.user?.displayName,
          image: canvasSmallImage,
          teeColor: teeState.tshirtColor,
        };

        setLoading(true);

        await fetch("/api/criacoes/atualizar", {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        toast({
          title: "Sucesso",
          description: "Desenho foi atualizado!",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao atualizar o desenho!",
        });
      } finally {
        setLoading(false);
      }
    },
    [isCriacao, teeState.tshirtColor]
  );

  const handleSalvarCriacao = useCallback(async () => {
    const canvasSerialization = CanvasBoardService.GetCanvasSerialization();
    const canvasSmallImage = CanvasBoardService.GetCanvasSmallImage();
    const token = jsCookie.get("__session");

    try {
      const params: Criacao = {
        id: shortUUID.generate(),
        canvas: canvasSerialization,
        userId: userState.user?.uid,
        user: userState.user?.displayName,
        image: canvasSmallImage,
        teeColor: teeState.tshirtColor,
      };

      setLoading(true);

      await fetch("/api/criacoes/criar", {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Sucesso",
        description: "Desenho foi salvo para rascunho!",
      });

      window.location.href = `/criacao=${params.id}`;
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o desenho!",
      });
    } finally {
      setLoading(false);
    }
  }, [isCriacao, teeState.tshirtColor]);

  const loadCriacao = useCallback(
    async (criacaoId: string) => {
      try {
        const token = jsCookie.get("__session");

        const response = await fetch(`/api/criacoes/carregar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: criacaoId }),
        });

        const criacao = await response.json();

        CanvasBoardService.LoadCanvasSerialization(criacao[0].canvas);
        teeState.updateColor(criacao[0].teeColor);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao carregar a criação!",
        });
      }
    },
    [isCriacao, teeState.tshirtColor]
  );

  useEffect(() => {
    if (window.location.pathname.includes("/criacao=")) {
      const criacao = window.location.pathname.split("=")[1];

      setIsCriacao(true);

      if (isCriacao) {
        loadCriacao(criacao);
      }
    }
  }, [isCriacao]);

  useEffect(() => {
    emitter.on("toggleEditButton", (selected) => {
      if (selected.length > 1 || selected.length === 0) {
        setEditDisabled(true);
      } else {
        setEditDisabled(false);
      }
    });

    return () => {
      emitter.off("toggleEditButton");
    };
  }, []);

  useEffect(() => {
    emitter.on("resetDrawControls", () => {
      setActiveBtn(null);
    });

    return () => {
      emitter.off("resetDrawControls");
    };
  }, []);

  return (
    <div className="flex gap-6 items-center justify-center p-2 relative z-30 h-full">
      <MenuText
        label="Texto"
        activeButton={activeButton}
        index={0}
        handleActiveClick={handleActiveClick}
      />

      <MenuImage
        label="Imagem"
        activeButton={activeButton}
        index={1}
        handleActiveClick={handleActiveClick}
        setActiveBtn={(value) => setActiveBtn(value)}
      />

      <MenuEdit
        label="Editar"
        disabled={editDisabled}
        activeButton={activeButton}
        index={2}
      />

      <MenuDefaultButton
        onClick={() => CanvasBoardService.FabricDeleteAllObjects()}
        icon={<EraserIcon />}
        index={3}
        label="Limpar"
      ></MenuDefaultButton>

      <MenuDefaultButton
        onClick={() =>
          isCriacao
            ? handleAtualizarCriacao(window.location.pathname.split("=")[1])
            : handleSalvarCriacao()
        }
        icon={<SaveIcon />}
        disabled={loading}
        index={4}
        label={isCriacao ? "Atualizar" : "Salvar"}
      ></MenuDefaultButton>
    </div>
  );
};
