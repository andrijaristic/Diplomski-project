import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Box, Card, Fade, Grid } from "@mui/material";
import AccountNavigationDrawer from "./AccountNavigationDrawer";

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
          <Grid item xs={1}>
            <AccountNavigationDrawer />
          </Grid>
          <Grid item xs={11}>
            <Card sx={{ height: "42rem", overflow: "auto" }}>
              <Outlet />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default Account;
