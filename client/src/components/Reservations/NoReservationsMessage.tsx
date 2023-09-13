import { FC } from "react";
import EmptyArrayMessage from "../UI/EmptyArrayMessage/EmptyArrayMessage";

const NoReservationsMessage: FC = () => {
  return (
    <EmptyArrayMessage message="You have no currently active reservations" />
  );
};

export default NoReservationsMessage;
