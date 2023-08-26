import { FC } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
interface IProps {
  propertyName: string;
  price: number;
}

const ReservationItem: FC<IProps> = (props) => {
  return (
    <Grid container direction="column" sx={{ display: "flex" }}>
      <Grid item sx={{ pt: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">{props.propertyName}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="subtitle2">
              {new Date().toLocaleString().split(",")[0]}
            </Typography>
            {"-"}
            <Typography variant="subtitle2">
              {new Date().toLocaleString().split(",")[0]}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          pt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h6" sx={{ pr: 1 }}>
              Price:
            </Typography>
            <Typography variant="h6">{props.price}</Typography>
          </Box>
          <Typography variant="caption">
            (average price per day: price / days)
          </Typography>
        </Box>
      </Grid>
      <Divider />
    </Grid>
  );
};

export default ReservationItem;
