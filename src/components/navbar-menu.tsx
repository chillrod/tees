import { Button } from "./ui/button";

import { userStore } from "@/stone/user";
import type { UserRecord } from "firebase-admin/auth";
import { useEffect } from "react";
import { NavBarMenuForm } from "./navbar-menu-orcamento-form";
import { NavBarMenuOptions } from "./navbar-menu-options";

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
        <div className="gap-4 hidden md:flex">
          <a
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
