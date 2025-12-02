import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <aside className="w-64 p-4 bg-white border-r border-gray-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Estoque.</h2>
        <p className="text-sm text-gray-500">seu controle de invetário</p>
      </div>

      <nav className="space-y-1 flex flex-col mt-8">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-300 font-medium text-gray-900"
              : "text-gray-700 hover:bg-gray-100 rounded-md"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-300 font-medium text-gray-900"
              : "text-gray-700 hover:bg-gray-100 rounded-md"
          }
        >
          Produtos
        </NavLink>
        <NavLink
          to="/materials"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-300 font-medium text-gray-900"
              : "text-gray-700 hover:bg-gray-100 rounded-md"
          }
        >
          Materiais
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-300 font-medium text-gray-900"
              : "text-gray-700 hover:bg-gray-100 rounded-md"
          }
        >
          Vendas
        </NavLink>
        <NavLink
          to="/clients"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-300 font-medium text-gray-900"
              : "text-gray-700 hover:bg-gray-100 rounded-md"
          }
        >
          Clientes
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
