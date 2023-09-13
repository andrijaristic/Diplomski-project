import { FC } from "react";
import { Fade, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import ListingsItem from "../Listings/ListingsItem";
import EmptyArrayMessage from "../UI/EmptyArrayMessage/EmptyArrayMessage";

const UserFavorites: FC = () => {
  const accommodations = useAppSelector(
    (state) => state.accommodations.accommodations
  );

  const content: JSX.Element[] = accommodations?.map((accommodation) => (
    <ListingsItem
      favorites={false}
      key={accommodation.id}
      accommodation={accommodation}
    />
  ));

  return (
    <Fade in>
      <Grid container>
        <Grid item xs={12}>
          <Grid container direction="column" sx={{ pt: 8, pl: 3 }}>
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
              {content.length > 0 ? (
                content
              ) : (
                <EmptyArrayMessage message="You do not have any favorited listings" />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  );
};
export default UserFavorites;
