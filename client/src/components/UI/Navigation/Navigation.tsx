import React, { FC, useMemo } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import styles from "./Navigation.module.css";
import Logo from "../Logo/Logo";
import { useAppSelector } from "../../../store/hooks";

interface IItem {
  name: string;
  to: string;
}

const generateNavItems = (isLoggedIn: boolean): IItem[] | null => {
  const items: IItem[] = [];

  if (isLoggedIn) {
    items.push({ name: "Search properties", to: "/second-element" });
    items.push({ name: "New property", to: "/third-element" });
    items.push({ name: "Account", to: "/account" }); // User name with drop-down menu for account and logout
  } else {
    items.push({ name: "Search properties", to: "/second-element" });
    items.push({ name: "New property", to: "/third-element" });
    items.push({ name: "Login", to: "/login" });
  }

  return items;
};

const Navigation: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const items = useMemo(() => {
    return generateNavItems(isLoggedIn);
  }, [isLoggedIn]);

  const content: React.ReactNode[] | undefined = items?.map((item) => {
    return (
      <li key={item.to}>
        <NavLink to={item.to} className={styles.nav__item}>
          <p>{item.name}</p>
        </NavLink>
      </li>
    );
  });

  return (
    <AppBar position="static" sx={{ background: "none" }}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ background: "none" }}>
        <Toolbar disableGutters>
          <Logo />
          <ul className={styles.nav}>{content}</ul>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
