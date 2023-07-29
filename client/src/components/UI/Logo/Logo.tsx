import { FC } from "react";
import { Badge, Typography } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import styles from "./Logo.module.css";

const Logo: FC = () => {
  return (
    <div className={styles.logo}>
      <Badge>
        <HouseIcon fontSize="large" />
      </Badge>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
        Rent-A-Room
      </Typography>
    </div>
  );
};

export default Logo;
