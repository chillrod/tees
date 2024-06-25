import { Button } from "./ui/button";

import { userStore } from "@/stone/user";
import type { UserRecord } from "firebase-admin/auth";
import { useEffect } from "react";
import { NavBarMenuForm } from "./navbar-menu-orcamento-form";
import { NavBarMenuOptions } from "./navbar-menu-options";

interface Props {
  user: UserRecord;
}

export const NavBarMenu = (props: Props) => {
  const userState = userStore();

  useEffect(() => {
    if (props.user) {
      userState.updateUser(props.user);
    }
  }, [props.user]);

  return (
    <div className="gap-4 hidden md:flex">
      <div>
        <NavBarMenuForm user={props.user}></NavBarMenuForm>
      </div>
      <div>
        <NavBarMenuOptions user={props.user}></NavBarMenuOptions>
      </div>
    </div>
  );
};
