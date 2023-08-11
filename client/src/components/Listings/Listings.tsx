import { FC, useState } from "react";
import { Fade, Grid, SelectChangeEvent } from "@mui/material";
import ListingsItem from "./ListingsItem";
import ListingActions from "./ListingActions";

const Listings: FC = () => {
  const [sortOption, setSortOption] = useState<string>("highest-price");

  const handleSortingChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value);
  };

  return (
    <Fade in>
      <Grid container>
        <Grid item xs={9}>
          <Grid container direction="column" sx={{ pt: 8, pl: 3 }}>
            <Grid item>
              <h2>
                Customize message depending on if there is search param or not
                <br />
                Listings [in [insert location from search params if there is
                one]]
              </h2>
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
                pt: 4,
                display: "flex",
                // justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
                flexGrow: 1,
              }}
            >
              <ListingsItem
                src="header-background.jpg"
                title="Test item"
                description="Test description"
                startingPrice={100}
                rating={5.0}
              />
              <ListingsItem
                src="header-background.jpg"
                title="Test item"
                description="Test description"
                startingPrice={100}
                rating={5}
              />
              <ListingsItem
                src="header-background.jpg"
                title="Test item"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                startingPrice={100}
                rating={5}
              />{" "}
              <ListingsItem
                src="header-background.jpg"
                title="Test item"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                startingPrice={100}
                rating={5}
              />{" "}
              <ListingsItem
                src="header-background.jpg"
                title="Test item"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                startingPrice={100}
                rating={5}
              />{" "}
              <ListingsItem
                src="header-background.jpg"
                title="Test item"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                startingPrice={100}
                rating={5}
              />{" "}
              <ListingsItem
                src="header-background.jpg"
                title="Test item"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                startingPrice={100}
                rating={5}
              />{" "}
              <ListingsItem
                src="header-background.jpg"
                title="Test item"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                startingPrice={100}
                rating={5}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Fade>
  );
};

export default Listings;
