import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Box, Fade, Grid, Paper } from "@mui/material";
import AccountNavigation from "./AccountNavigation";

const Account: FC = () => {
  return (
    <Fade in>
      <Box
        sx={{
          width: "100%",
          minWidth: "fit-content",
          pt: 8,
          pr: "8%",
          pl: "8%",
        }}
      >
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={3}>
            <AccountNavigation />
          </Grid>
          <Grid item xs={9}>
            <Paper sx={{ height: "38rem", overflow: "auto" }}>
              <Outlet />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default Account;
