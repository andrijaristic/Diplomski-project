import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Box, SxProps, Theme, Typography } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import styles from "./Logo.module.css";

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
        <Typography variant="h4">Rent-A-Room</Typography>
      </NavLink>
    </Box>
  );
};

export default Logo;
