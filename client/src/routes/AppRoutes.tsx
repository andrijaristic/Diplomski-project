import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AppLayout from "../layouts/AppLayout";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/login" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
