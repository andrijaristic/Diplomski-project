import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Box } from "@mui/material";
import ReservationItem from "./ReservationItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  cancelReservationAction,
  getUserReservationsAction,
} from "../../store/reservationSlice";
import { IJwt } from "../../shared/interfaces/userInterfaces";
import NoReservationsMessage from "./NoReservationsMessage";

const ReservationsList: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);
  const { id } = jwtDecode<IJwt>(token ? token : "");

  const [refresh, setRefresh] = useState<boolean>(false);
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );

  useEffect(() => {
    if (!refresh) {
      return;
    }

    dispatch(getUserReservationsAction(id ? id : ""));
    setRefresh(false);
  }, [refresh, id, dispatch]);

  const handleAccommodationNavigateion = (id: string) => () => {
    navigate(`/listings/${id}`);
  };

  const handleReservationCancel = (id: string) => async () => {
    const response = await dispatch(cancelReservationAction(id));
    if (response) {
      setRefresh(true);
    }
  };

  const content = reservations?.map((reservation) => (
    <ReservationItem
      key={reservation.id}
      reservation={reservation}
      onCancel={handleReservationCancel(reservation?.id)}
      onNavigate={handleAccommodationNavigateion(reservation?.propertyId)}
    />
  ));

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      {content.length > 0 ? content : <NoReservationsMessage />}
    </Box>
  );
};

export default ReservationsList;
