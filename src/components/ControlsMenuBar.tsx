import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { TeeColorsList } from "./TeeColorsList";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import ColorInput from "./ui/color-input";
import { Drawer } from "vaul";
import { emitter } from "@/services/mitt";

export const ControlsMenuBar = () => {
  const stampColorChange = (color: string) => {
    emitter.emit("stampColor", color);
  };

  const teeColorChange = (color: string) => {
    emitter.emit("teeColor", color);
  };

  return (
    <Card className="bg-transparent grid gap-6 p-6">
      <CardTitle className="text-stone-200">Controls</CardTitle>
      <ColorInput onChange={stampColorChange} />
      <CardTitle className="text-stone-200">Shirt Colors</CardTitle>
      <ColorInput onChange={teeColorChange} />
    </Card>
  );
};
