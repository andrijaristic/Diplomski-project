import React, { FC, useMemo } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import styles from "./Navigation.module.css";
import Logo from "../Logo/Logo";

interface IItem {
  name: string;
  to: string;
}

const generateNavItems = (): IItem[] | null => {
  const items: IItem[] = [];

  items.push({ name: "Search properties", to: "/second-element" });
  items.push({ name: "New property", to: "/third-element" });
  items.push({ name: "Login/Account", to: "/fourth-element" });

  return items;
};

const Navigation: FC = () => {
  const items = useMemo(() => {
    return generateNavItems();
  }, []);

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
