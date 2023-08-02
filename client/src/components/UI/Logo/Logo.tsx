import { FC } from "react";
import { Badge, Typography } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import styles from "./Logo.module.css";
import { NavLink } from "react-router-dom";

const Logo: FC = () => {
  return (
    <NavLink className={styles.logo} to="/">
      <Badge>
        <HouseIcon color="secondary" sx={{ fontSize: 48 }} />
      </Badge>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
        Rent-A-Room
      </Typography>
    </NavLink>
  );
};

export default Logo;
