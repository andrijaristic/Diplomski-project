import { FC } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import { grey } from "@mui/material/colors";
import ReservationItemDate from "./ReservationItemDate";
import { IReservationDisplay } from "../../shared/interfaces/reservationInterface";

interface IProps {
  reservation: IReservationDisplay;
  onCancel: () => void;
  onNavigate: () => void;
}

const ReservationItem: FC<IProps> = ({ reservation, onCancel, onNavigate }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        height: "fit-content",
        border: `1px solid ${grey[400]}`,
      }}
    >
      <Paper sx={{ height: 8, bgcolor: "secondary.main" }} />
      <Stack direction="row" sx={{ p: 2, pt: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Typography variant="h5">{reservation?.propertyName}</Typography>
              <Typography
                variant="h5"
                color={`${reservation?.isPayed ? "green" : "error"}`}
              >
                {reservation?.isPayed ? "PAID" : "UNPAID"}
              </Typography>
            </Stack>
            <ReservationItemDate
              arrivalDate={reservation?.arrivalDate}
              departureDate={reservation?.departureDate}
            />
          </Box>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6">Price:</Typography>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <EuroSymbolIcon />
              {reservation?.price}
            </Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            ml: "auto",
          }}
        >
          <Button variant="outlined" color="info" onClick={onNavigate}>
            View accommodation
          </Button>
          {!reservation?.isPayed && (
            <Button variant="outlined" color="error" onClick={onCancel}>
              Cancel reservation
            </Button>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default ReservationItem;

/*

    <Grid container direction="column" sx={{ display: "flex" }}>
      <Grid item sx={{ pt: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">{reservation?.propertyName}</Typography>
          <Typography variant="subtitle2">{displayDate}</Typography>
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

*/
