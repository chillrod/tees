import { CanvasBoard } from "@/components/canvas-board";
import { CanvasLayer } from "@/components/canvas-controls/canvas-layer";
import { CanvasControlsMenu } from "@/components/canvas-controls/menu";
import { Scene } from "@/components/scene";
import { MobileHome } from "./mobile/MobileHome";
import { ThreeControls } from "@/components/three-controls/controls";
import { useMediaQuery } from "react-responsive";
export const Home = () => {
  const isLarge = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <>
      {!isLarge ? (
        <div className="w-full h-full">
          <MobileHome />
        </div>
      ) : (
        <div className="grid mx-auto h-[90dvh] max-w-screen-2xl">
          <main className="p-4">
            <div className="relative w-full bg-stone-100 dark:bg-stone-900 p-4 flex flex-col rounded-lg overflow-auto h-full">
              <div className="grid lg:grid-cols-2 items-center h-full w-full">
                <div className="flex h-full items-center w-full">
                  <div className="self-end mb-10">
                    <ThreeControls />
                  </div>
                  <div className="h-full w-full">
                    <Scene />
                  </div>
                </div>
                <div className="w-full h-full self-center flex flex-col relative">
                  <div className="h-[80dvh]">
                    <CanvasBoard />
                  </div>
                  <div className="absolute bottom-6 w-full">
                    <CanvasControlsMenu />
                  </div>
                  <div className="absolute right-0 top-0">
                    <CanvasLayer />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};
