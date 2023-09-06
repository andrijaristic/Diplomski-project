import { Typography } from "@mui/material";
import { FC } from "react";

interface IProps {
  arrivalDate: Date;
  departureDate: Date;
}

const ReservationItemDate: FC<IProps> = ({ arrivalDate, departureDate }) => {
  const displayDate = `${new Date(arrivalDate).toLocaleDateString(
    "en-GB"
  )} - ${new Date(departureDate).toLocaleDateString("en-GB")}`;

  return <Typography variant="subtitle2">{displayDate}</Typography>;
};

export default ReservationItemDate;
