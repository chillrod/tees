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

export const ControlsMenuBar = () => {
  return (
    <NavigationMenu orientation="horizontal">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>T-Shirt Colors</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 min-w-[50vw] md:min-w-[20vw]">
              <CardTitle>Available Colors:</CardTitle>
              <TeeColorsList />
            </ul>

            {/* <div>
              <Card>
                <CardTitle>Lista Cores</CardTitle>
                <CardContent>
                  <TeeColorsList />
                </CardContent>
              </Card>
            </div> */}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
