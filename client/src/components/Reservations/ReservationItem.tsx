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

const checkIfDatePassed = (endDate: Date) => {
  return new Date(endDate) <= new Date(new Date().setHours(12, 0, 0, 0));
};

const ReservationItem: FC<IProps> = ({ reservation, onCancel, onNavigate }) => {
  const reservationComplete = checkIfDatePassed(reservation?.departureDate);
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
              <Typography variant="h5">
                {reservation?.accommodationName}
              </Typography>
              {!reservationComplete && (
                <Typography
                  variant="h5"
                  color={`${reservation?.isPayed ? "green" : "error"}`}
                >
                  {reservation?.isPayed ? "PAID" : "UNPAID"}
                </Typography>
              )}
              {reservationComplete && (
                <Typography variant="h5" color="green">
                  COMPLETED
                </Typography>
              )}
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
            <Button
              variant="outlined"
              color="error"
              onClick={onCancel}
              disabled={reservationComplete}
            >
              Cancel reservation
            </Button>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default ReservationItem;
