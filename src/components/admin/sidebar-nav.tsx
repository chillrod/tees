import { BrushIcon, CogIcon, FoldersIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { AdminUsuarios } from "./usuarios";
import { useState } from "react";
import * as Separator from "@radix-ui/react-separator";
import { AdminPedidos } from "./pedidos";
import { AdminCriacoes } from "./criacoes";
import { AdminConfiguracoes } from "./configuracoes";

export const AdminSideBarNav = () => {
  const [componentToRender, setComponentToRender] = useState<React.ReactNode>(
    <AdminConfiguracoes />
  );

  const [activeMenu, setActiveMenu] = useState(0);

  const sidebarNavs = [
    {
      name: "Configurações",
      description: "Gerencie as configurações do sistema.",
      icon: <CogIcon />,
      component: <AdminConfiguracoes />,
    },
    {
      name: "Usuários",
      description: "Gerencie os usuários do sistema.",
      icon: <UserIcon />,
      component: <AdminUsuarios />,
    },
    {
      name: "Criacoes",
      description: "Gerencie os usuários do sistema.",
      icon: <BrushIcon />,
      component: <AdminCriacoes />,
    },
    {
      name: "Orçamentos",
      description: "Gerencie os orçamentos do sistema.",
      icon: <FoldersIcon />,
      component: <AdminPedidos />,
    },
  ];

  return (
    <div className="md:grid grid-cols-12 gap-6 justify-start">
      <ul className="col-span-2 flex flex-col gap-2 w-full">
        {sidebarNavs.map((nav, index) => (
          <li key={index}>
            <Button
              onClick={() => [
                setActiveMenu(index),
                setComponentToRender(nav.component),
              ]}
              variant="secondary"
              className={`${
                activeMenu === index ? "bg-stone-400" : "bg-stone-300"
              } w-full`}
            >
              {nav.icon}
              {nav.name}
            </Button>
          </li>
        ))}
      </ul>
      <div className="w-full grid gap-6 col-span-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {sidebarNavs[activeMenu].name}
          </h2>
          <p className="text-sm text-stone-500">
            {sidebarNavs[activeMenu].description}
          </p>
          <Separator.Root className="border-b-2 my-2" />
        </div>
        <div>{componentToRender}</div>
      </div>
    </div>
  );
};
