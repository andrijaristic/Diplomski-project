import { Box, Grid } from "@mui/material";
import { FC } from "react";

const style = {
  background: "gray",
  border: "1px solid red",
  height: "fit-content",
  width: "98%",
  color: "black",
};

const style2 = {
  background: "gray",
  border: "1px solid red",
  height: "fit-content",
  width: "90%",
  color: "black",
};

const DetailedListing: FC = () => {
  return (
    <Grid container sx={{ pt: 8, pl: 40, pr: 40 }}>
      <Grid item xs={9}>
        <Grid container direction="column">
          {/* Images, Description, Availability & Prices, Comments */}
          <Grid item>
            <Box sx={style}>Bar for tping through page</Box>
          </Grid>
          <Grid item>
            <Box sx={style}>
              <Box
                component="img"
                src="/header-background.jpg"
                alt="thumbnail-image"
                sx={{
                  height: 600,
                  width: 940,
                }}
              ></Box>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={style}>Description</Box>
          </Grid>
          <Grid item>
            <Box sx={style}>Availability & Pricing</Box>
          </Grid>
          <Grid item>
            <Box sx={style}>Comments</Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={style2} xs={3}>
        2
      </Grid>
    </Grid>
  );
};

export default DetailedListing;
