import { FC } from "react";
import { Badge, Box, SxProps, Theme, Typography } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import styles from "./Logo.module.css";
import { NavLink } from "react-router-dom";

interface IProps {
  sx?: SxProps<Theme> | undefined;
}

const Logo: FC<IProps> = ({ sx }) => {
  return (
    <Box sx={{ ...sx }}>
      <NavLink className={styles.logo} to="/">
        <Badge>
          <HouseIcon color="secondary" sx={{ fontSize: 48 }} />
        </Badge>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Rent-A-Room
        </Typography>
      </NavLink>
    </Box>
  );
};

export default Logo;
