import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import AppLayout from "../layouts/AppLayout";
import UserFormLayout from "../components/UI/UserFormLayout/UserFormLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ListingsPage from "../pages/ListingsPage";
import DetailedListingPage from "../pages/DetailedListingPage";
import RegistrationPage from "../pages/RegistrationPage";
import AccountPage from "../pages/AccountPage";
import UserInformationPage from "../pages/UserInformationPage";
import PasswordChangePage from "../pages/PasswordChangePage";
import CommentsPage from "../pages/CommentsPage";
import ReservationsPage from "../pages/ReservationsPage";
import MyListingsPage from "../pages/MyListingsPage";
import EditListingPage from "../pages/EditListingPage";
import NewListingPage from "../pages/NewListingPage";

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
          <Route path="/listings">
            <Route index element={<ListingsPage />} />
            <Route path=":id" element={<DetailedListingPage />} />
            {isLoggedIn && (
              <>
                <Route path=":id/edit" element={<EditListingPage />} />
                <Route path="new" element={<NewListingPage />} />
              </>
            )}
          </Route>

          {isLoggedIn && (
            <>
              <Route path="/account" element={<AccountPage />}>
                <Route index element={<UserInformationPage />} />
                <Route
                  path="change-password"
                  element={<PasswordChangePage />}
                />
                <Route path="comments" element={<CommentsPage />} />
                <Route path="reservations" element={<ReservationsPage />} />
                <Route path="my-listings" element={<MyListingsPage />} />
                <Route path="*" element={<Navigate replace to="/" />} />
              </Route>
            </>
          )}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
