import { FC } from "react";
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
        border: "1px solid red",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={3}>
          <AccountNavigation />
        </Grid>
        <Grid item xs={9} sx={{ border: "1px solid red" }}></Grid>
      </Grid>
    </Box>
  );
};

export default Account;
