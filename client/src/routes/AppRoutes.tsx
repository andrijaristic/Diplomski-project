import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import AppLayout from "../layouts/AppLayout";
import UserFormLayout from "../components/UI/CommonLayouts/UserFormLayout";
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
import AddRoomsPage from "../pages/AddRoomsPage";
import UnverifiedUsersPage from "../pages/UnverifiedUsersPage";
import ViewRoomsPage from "../pages/ViewRoomsPage";

const AppRoutes: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const user = useAppSelector((state) => state.user.user);

  const isOwner = user?.role === "OWNER" && user?.isVerified;
  const isAdmin = user?.role === "ADMIN";

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
            {isLoggedIn && isOwner && (
              <>
                <Route path="new" element={<NewListingPage />} />
                <Route path=":id/edit" element={<EditListingPage />} />
                <Route path=":id/add-rooms" element={<AddRoomsPage />} />
                <Route path=":id/rooms" element={<ViewRoomsPage />} />
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
                {isOwner && (
                  <Route path="my-listings" element={<MyListingsPage />} />
                )}
                {isAdmin && (
                  <Route
                    path="unverified-users"
                    element={<UnverifiedUsersPage />}
                  />
                )}
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
