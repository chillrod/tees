import { AdminSideBarNav } from "@/components/admin/sidebar-nav";

export const Admin = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Painel de ações</h2>
        <p className="text-sm text-stone-500">
          Configure o sistema, veja os pedidos, entre em contato com os
          usuários.
        </p>
      </div>
      <div className="sticky top-24 h-[75vh] overflow-auto">
        <AdminSideBarNav />
      </div>
    </>
  );
};
