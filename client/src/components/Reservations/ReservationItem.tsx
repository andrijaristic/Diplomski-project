import { FC } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { IReservationDisplay } from "../../shared/interfaces/reservationInterface";

interface IProps {
  reservation: IReservationDisplay;
}

const ReservationItem: FC<IProps> = ({ reservation }) => {
  const days =
    (new Date(reservation?.departureDate).getTime() -
      new Date(reservation?.arrivalDate).getTime()) /
    (1000 * 3600 * 24);

  return (
    <Grid container direction="column" sx={{ display: "flex" }}>
      <Grid item sx={{ pt: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">{reservation?.propertyName}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="subtitle2">
              {`${new Date(
                reservation?.arrivalDate
              ).toLocaleDateString()} - ${new Date(
                reservation?.departureDate
              ).toLocaleDateString()}`}
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
            <Typography variant="h6">{reservation?.price}</Typography>
          </Box>
          <Typography variant="caption">
            (average price per day: {reservation?.price / days} / {days})
          </Typography>
        </Box>
      </Grid>
      <Divider />
    </Grid>
  );
};

export default ReservationItem;
