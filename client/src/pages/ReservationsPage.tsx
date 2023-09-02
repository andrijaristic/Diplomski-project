import { FC, useEffect } from "react";
import jwtDecode from "jwt-decode";
import ReservationsList from "../components/Reservations/ReservationsList";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { ApiCallState } from "../shared/types/enumerations";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserReservationsAction } from "../store/reservationSlice";
import { IJwt } from "../shared/interfaces/userInterfaces";

const ReservationsPage: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const apiState = useAppSelector((state) => state.reservations.apiState);

  const { id } = jwtDecode<IJwt>(token ? token : "");

  useEffect(() => {
    dispatch(getUserReservationsAction(id));
  }, [id, dispatch]);

  return (
    <>
      <ReservationsList />
      <LoadingModal show={apiState === ApiCallState.PENDING} />
    </>
  );
};

export default ReservationsPage;
