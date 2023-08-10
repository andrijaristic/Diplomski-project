import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { useAppSelector } from "../store/hooks";

const AppRoutes: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        )}
        {isLoggedIn && (
          <Route element={<AppLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
