import { FC, useState } from "react";
import { Box, Fade, Grid, Pagination, SelectChangeEvent } from "@mui/material";
import ListingsItem from "./ListingsItem";
import ListingActions from "./ListingActions";

const DUMMY_OBJECT = {
  src: "header-background.jpg", // image src
  title: "Dummy title", // listing name
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
};

const Listings: FC = () => {
  const [sortOption, setSortOption] = useState<string>("highest-price");

  const handleSortingChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value);
  };

  const content: JSX.Element[] = [];
  for (let i = 0; i < 10; i++) {
    content.push(
      <ListingsItem
        key={Math.random() * 1000}
        src={DUMMY_OBJECT.src}
        title={DUMMY_OBJECT.title}
        description={DUMMY_OBJECT.description}
        startingPrice={Math.random() * 1000}
        reviewAmount={Math.random() * 500}
        rating={Math.random() * 5}
      />
    );
  }

  return (
    <Fade in>
      <Grid container>
        <Grid item xs={9}>
          <Grid container direction="column" sx={{ pt: 8, pl: 3 }}>
            <Grid item>
              <h1>Property listings</h1>
            </Grid>
            <Grid
              item
              sx={{
                pt: 2,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ListingActions
                sort={sortOption}
                onChange={handleSortingChange}
              />
            </Grid>
            <Grid
              item
              sx={{
                pt: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                count={10} // Max pages
                shape="rounded"
                variant="outlined"
                size="large"
                color="secondary"
              />
            </Grid>
            <Grid
              item
              sx={{
                pt: 2,
                pr: 2,
                gap: 2,
                display: "flex",
                flexWrap: "wrap",
                flexGrow: 1,
                flexShrink: 1,
              }}
            >
              {content}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ position: "fixed" }}>{content}</Box>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default Listings;
