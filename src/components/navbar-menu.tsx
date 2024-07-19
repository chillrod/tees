import { Button } from "./ui/button";

import { userStore } from "@/store/user";
import type { UserRecord } from "firebase-admin/auth";
import { useEffect } from "react";
import { NavBarMenuForm } from "./navbar-menu-orcamento-form";
import { NavBarMenuOptions } from "./navbar-menu-options";
import { InstagramIcon, MailIcon, MenuIcon } from "lucide-react";
import { SobreNos } from "./about-us";
import { ComoUsar } from "./how-to-use";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  user?: UserRecord;
}

export const NavBarMenu = ({ user }: Props) => {
  const userState = userStore();

  useEffect(() => {
    if (user) {
      userState.updateUser(user);
    }
  }, [user]);

  return (
    <>
      {user ? (
        <>
          <div className="flex lg:hidden gap-2">
            <NavBarMenuOptions user={user}></NavBarMenuOptions>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="link">
                  <MenuIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="flex flex-col">
                  <DropdownMenuItem asChild>
                    <ComoUsar>
                      <Button variant="link">Como Usar</Button>
                    </ComoUsar>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <SobreNos>
                      <Button variant="link">Sobre Nós</Button>
                    </SobreNos>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <NavBarMenuForm user={user}></NavBarMenuForm>
                  </DropdownMenuItem>
                </div>

                <DropdownMenuItem>
                  <a href="/criar" className="text-center w-full">
                    Criar
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a
                    href="mailto:contato@studioestampar.com.br?subject=Olá Studio Estampar&body=Gostaria de saber mais sobre o Studio Canvas"
                    target="_blank"
                    className="text-center w-full"
                  >
                    Enviar Email
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a
                    href="https://www.tiktok.com/@studioestampar"
                    target="_blank"
                    className="text-center w-full"
                  >
                    Tiktok
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a
                    href="https://www.instagram.com/studioestampar/"
                    target="_blank"
                    className="text-center w-full"
                  >
                    Instagram
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <ComoUsar>
              <Button variant="link">Como Usar</Button>
            </ComoUsar>
            <SobreNos>
              <Button variant="link">Sobre Nós</Button>
            </SobreNos> */}
          </div>
          <div className="gap-6 hidden lg:flex  items-center dark:text-stone-200">
            <ComoUsar>
              <Button variant="link">Como Usar</Button>
            </ComoUsar>
            <SobreNos>
              <Button variant="link">Sobre Nós</Button>
            </SobreNos>
            <a
              href="mailto:contato@studioestampar.com.br?subject=Olá Studio Estampar&body=Gostaria de saber mais sobre o Studio Canvas"
              target="_blank"
            >
              <MailIcon />
            </a>
            <a href="https://www.tiktok.com/@studioestampar" target="_blank">
              <img
                src="tiktok.svg"
                width="25px"
                height="25px"
                alt="TikTok"
                className="dark:invert"
              />
            </a>
            <a href="https://www.instagram.com/studioestampar/" target="_blank">
              <InstagramIcon />
            </a>
            <a
              className="ml-3"
              href="
        /"
            >
              <Button variant="link">Criar</Button>
            </a>
            <div>
              <NavBarMenuForm user={user}></NavBarMenuForm>
            </div>
            <div>
              <NavBarMenuOptions user={user}></NavBarMenuOptions>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>Erro</div>
        </>
      )}
    </>
  );
};
