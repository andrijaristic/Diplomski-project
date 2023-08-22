import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ListingsPage from "../pages/ListingsPage";
import DetailedListingPage from "../pages/DetailedListingPage";
import RegistrationPage from "../pages/RegistrationPage";
import UserFormLayout from "../components/UI/UserFormLayout/UserFormLayout";
import AccountPage from "../pages/AccountPage";
import UserInformationPage from "../pages/UserInformationPage";

const AppRoutes: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn && (
          <Route element={<UserFormLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Route>
        )}
        <Route element={<AppLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<DetailedListingPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/:id" element={<AccountPage />}>
            <Route index element={<UserInformationPage />} />
            <Route path="change-password" element={<UserInformationPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
