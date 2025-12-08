import { NavLink } from "react-router";

import {
  Boxes,
  DollarSign,
  LayoutDashboard,
  Package,
  Users,
} from "lucide-react";

import { cn } from "@/lib/cn";

const Sidebar = () => {
  const menu = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/" },
    { label: "Produtos", icon: Package, to: "/products" },
    { label: "Materiais", icon: Boxes, to: "/materials" },
    { label: "Vendas", icon: DollarSign, to: "/sales" },
    { label: "Clientes", icon: Users, to: "/clients" },
  ];
  return (
    <aside className="w-64 bg-[#EDEDED] border h-screen flex flex-col p-6">
      <div className="my-10 items-center flex flex-col">
        <h1 className="text-4xl font-medium tracking-tight">ESTOQUE.</h1>
        <p className="text-md text-gray-600 mt-1">seu controle de inventário</p>
      </div>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-md font-medium leading-none",
                  "text-gray-800 hover:bg-gray-300/40",
                  isActive && "bg-gray-300/70"
                )
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="flex items-center">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
