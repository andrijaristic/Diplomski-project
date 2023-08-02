import { FC } from "react";
import Navigation from "../components/UI/Navigation/Navigation";
import { Outlet } from "react-router-dom";

const AppLayout: FC = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default AppLayout;
