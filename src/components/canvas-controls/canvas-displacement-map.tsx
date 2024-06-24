import { CanvasBoardService } from "@/services/canvas-board.service";
import { emitter } from "@/services/mitt";
import { useEffect, useRef, useState } from "react";

export const CanvasDisplacementMap = () => {
  const [texture, setTexture] = useState();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    emitter.on("updateTexture", () => {
      const canvasContext = CanvasBoardService.editor?.canvas.getElement();

      //   const canvasWidth = CanvasBoardService.editor?.canvas.getWidth();
      //   const canvasHeight = CanvasBoardService.editor?.canvas.getHeight();

      //   canvas.current!.width = canvasWidth!;
      //   canvas.current!.height = canvasHeight!;
      //   canvas?.current
      //     ?.getContext("2d")
      //     ?.drawImage(canvasContext!, 0, 0, canvasWidth!, canvasHeight!);
      emitter.emit("updateCanvasRef", canvasContext);
    });
  }, []);

  return <canvas ref={canvas} />;
};
