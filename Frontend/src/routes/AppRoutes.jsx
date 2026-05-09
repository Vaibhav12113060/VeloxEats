import React from "react";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProvideAuthority from "../pages/Admin/ProvideAuthority";
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<MainLayout />}></Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/provide-authority" element={<ProvideAuthority />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
