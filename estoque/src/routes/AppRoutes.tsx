import MainLayout from "@/components/layout/MainLayout";
import Clients from "@/pages/Clients";
import Dashboard from "@/pages/Dashboard";
import Materials from "@/pages/Materials";
import Products from "@/pages/Products";
import Sales from "@/pages/Sales";

import { Route, Routes, Navigate } from "react-router";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/clients" element={<Clients />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
