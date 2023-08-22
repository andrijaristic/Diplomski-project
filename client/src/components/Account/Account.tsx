import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import AccountNavigation from "./AccountNavigation";

const Account: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        pt: 8,
        pr: "20%",
        pl: "20%",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={3}>
          <AccountNavigation />
        </Grid>
        <Grid item xs={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Account;
