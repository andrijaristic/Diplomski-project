import { FC } from "react";
import { Fade, Grid } from "@mui/material";
import StyledButton from "../UI/Styled/StyledButton";
import ListingsItem from "./ListingsItem";

const Listings: FC = () => {
  return (
    <Fade in>
      <Grid container direction="column" sx={{ mt: 8, ml: 3 }}>
        <Grid item>
          <h2>
            Customize message depending on if there is search param or not
            <br />
            Listings [in [insert location from search params if there is one]]
          </h2>
        </Grid>
        <Grid item sx={{ mt: 2, display: "flex", flexDirection: "row" }}>
          <StyledButton sx={{ minWidth: "8rem", maxWidth: "fit-content" }}>
            Filters (opens modal)
          </StyledButton>
        </Grid>
        <Grid
          item
          sx={{ mt: 4, display: "flex", flexWrap: "wrap", flexGrow: 1 }}
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
    </Fade>
  );
};

export default Listings;
