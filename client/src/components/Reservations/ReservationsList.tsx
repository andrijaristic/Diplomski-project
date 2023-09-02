import { FC } from "react";
import { Box } from "@mui/material";
import ReservationItem from "./ReservationItem";
import { useAppSelector } from "../../store/hooks";

const ReservationsList: FC = () => {
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );
  {
    /* Tmp data to verify if display is fine if appropriate fields are sent  */
  }
  const res = {
    id: "1",
    isPayed: true,
    price: 100,
    arrivalDate: new Date("01/01/2023"),
    departureDate: new Date("02/02/2023"),
    propertyName: "Dummy property name",
    propertyId: "2",
  };

  const content = reservations?.map((reservation) => (
    <ReservationItem key={reservation.id} reservation={reservation} />
  ));

  return (
    <Box
      sx={{
        pl: 2,
        pr: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ReservationItem reservation={res} />
      {content.length > 0 && content}
    </Box>
  );
};

export default ReservationsList;
