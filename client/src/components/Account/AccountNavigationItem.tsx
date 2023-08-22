import { FC } from "react";
import { Box, Divider, Link, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

interface IProps {
  title: string;
  to: string;
}

const AccountNavigationItem: FC<IProps> = ({ title, to }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      <Link
        component={NavLink}
        to={to}
        sx={{ textDecoration: "none", textTransform: "capitalize" }}
      >
        <Typography variant="h6">{title}</Typography>
      </Link>
      <Divider sx={{ width: "100%" }} />
    </Box>
  );
};

export default AccountNavigationItem;
