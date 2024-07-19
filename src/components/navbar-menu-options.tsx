import type { UserRecord } from "firebase-admin/auth";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { SuasCriacoes } from "./suas-criacoes";
import { SuasCriacoesAssociadas } from "./suas-criacoes-associadas";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-2 items-center">
          <img
            src={props?.user?.photoURL || ""}
            alt=""
            className="rounded-full"
            width={30}
            height={30}
          />
          <span className="dark:text-stone-200">
            {props?.user?.displayName && props.user.displayName.length > 13
              ? props.user.displayName?.slice(0, 13) + "..."
              : props?.user?.displayName || ""}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]">
        {props?.user?.customClaims?.admin && (
          <DropdownMenuItem>
            <a href="/admin">
              <Button variant="link">Administrador</Button>
            </a>
          </DropdownMenuItem>
        )}
        <SuasCriacoes>
          <Button variant="link">Suas criações</Button>
        </SuasCriacoes>
        <SuasCriacoesAssociadas>
          <Button variant="link">Criações</Button>
        </SuasCriacoesAssociadas>
        <Button variant="link" onClick={() => handleDeslogar()}>
          Deslogar
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
