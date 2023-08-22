import { FC } from "react";
import { Box, Fade, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const UserFormLayout: FC = () => {
  return (
    <Fade in>
      <Grid container sx={{ height: "100vh", width: "100%" }}>
        <Grid item lg={8} md={6} sm={4} xs={0}>
          <Box
            sx={{
              height: "100%",
              background: `linear-gradient(
                42deg,
                rgba(12, 19, 61, 1) 2%,
                rgba(137, 208, 255, 1) 29%,
                rgba(12, 19, 61, 1) 76%
              )
              `,
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} sm={8} xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default UserFormLayout;
