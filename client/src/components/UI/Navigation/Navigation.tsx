import React, { FC, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { AppBar, Container, Toolbar } from "@mui/material";
import Logo from "../Logo/Logo";
import styles from "./Navigation.module.css";

interface IItem {
  name: string;
  to: string;
}

const generateNavItems = (isLoggedIn: boolean): IItem[] | null => {
  const items: IItem[] = [];

  items.push({ name: "Properties", to: "/listings" });
  if (isLoggedIn) {
    items.push({ name: "New property", to: "/third-element" });
    items.push({ name: "Account", to: "/account" }); // User name with drop-down menu for account and logout
  } else {
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
    <AppBar
      position="sticky"
      sx={{
        background: "white",
        scrollbarGutter: "stable both-edges",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <ul className={styles.nav}>{content}</ul>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
