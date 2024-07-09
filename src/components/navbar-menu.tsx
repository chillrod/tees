import { Button } from "./ui/button";

import { userStore } from "@/store/user";
import type { UserRecord } from "firebase-admin/auth";
import { useEffect } from "react";
import { NavBarMenuForm } from "./navbar-menu-orcamento-form";
import { NavBarMenuOptions } from "./navbar-menu-options";
import { InstagramIcon, MailIcon } from "lucide-react";
import { SobreNos } from "./about-us";
import { ComoUsar } from "./how-to-use";

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
        <div className="gap-6 hidden md:flex  items-center dark:text-stone-200">
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
      ) : (
        <>
          <div>Erro</div>
        </>
      )}
    </>
  );
};
