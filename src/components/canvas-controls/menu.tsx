import { useEffect, useState } from "react";
import { emitter } from "@/services/mitt";
import { MenuText } from "./menu-text";

import * as Menubar from "@radix-ui/react-menubar";
import { MenuImage } from "./menu-image";
import { keyboardEvents } from "@/services/keyboard-events";

export interface MenuChildrenProps {
  activeButton: number | null;
  index: number;
  handleActiveClick: (
    index: number,
    activeButton: number | null,
    onClickFunc?: () => void
  ) => void;
}

export const CanvasControlsMenu = () => {
  const [activeButton, setActiveBtn] = useState<number | null>(null);

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

  useEffect(() => {
    emitter.on("resetDrawControls", () => {
      setActiveBtn(null);
    });

    return () => {
      emitter.off("resetDrawControls");
    };
  }, []);

  return (
    <Menubar.Root className=" p-2 rounded-lg flex flex-col gap-2 h-full">
      <Menubar.Menu>
        <Menubar.Trigger>
          <MenuText
            activeButton={activeButton}
            index={0}
            handleActiveClick={handleActiveClick}
          />
        </Menubar.Trigger>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>
          <MenuImage
            activeButton={activeButton}
            index={1}
            handleActiveClick={handleActiveClick}
            setActiveBtn={(value) => setActiveBtn(value)}
          ></MenuImage>
        </Menubar.Trigger>
      </Menubar.Menu>
    </Menubar.Root>
  );
};
