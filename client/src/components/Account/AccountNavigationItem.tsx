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
        <Typography
          sx={{
            fontSize: "1.2rem",
            "@media (max-width: 1668px)": {
              fontSize: "1.1rem",
            },
            "@media (max-width: 1260px)": {
              fontSize: "1rem",
            },
            "@media (max-width: 846px)": {
              fontSize: "0.8rem",
            },
          }}
        >
          {title}
        </Typography>
      </Link>
      <Divider sx={{ width: "100%" }} />
    </Box>
  );
};

export default AccountNavigationItem;
