import {
  Link,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { NavigationMenu } from "./ui/navigation-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import type { UserRecord } from "firebase-admin/auth";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useEffect } from "react";

interface Props {
  user?: UserRecord;
}

export const NavBarMenuOptions = (props: Props) => {
  const handleDeslogar = async () => {
    try {
      await fetch("/api/auth/signout", {
        method: "GET",
      });

      window.location.href = "/logar";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NavigationMenu className="list-none relative">
      <NavigationMenuItem>
        <NavigationMenuTrigger className="hover:bg-stone-200 ease-in-out duration-200 rounded-lg ">
          <div className="flex gap-2 items-center">
            <img
              src={props?.user?.photoURL || ""}
              alt=""
              className="rounded-full"
              width={40}
              height={40}
            />
            {props?.user?.displayName && props.user.displayName.length > 13
              ? props.user.displayName?.slice(0, 13) + "..."
              : props?.user?.displayName || ""}
          </div>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="z-30 absolute">
          <Card className="bg-stone-100 p-2">
            {props?.user?.customClaims?.admin && (
              <Link href="/admin">
                <Button variant="link">Administrador</Button>
              </Link>
            )}
            <Button variant="link" disabled>
              Suas criações
            </Button>
            <Button variant="link" onClick={() => handleDeslogar()}>
              Deslogar
            </Button>
          </Card>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
};
