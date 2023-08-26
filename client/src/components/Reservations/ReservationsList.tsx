import { FC } from "react";
import { Box } from "@mui/material";
import ReservationItem from "./ReservationItem";

const ReservationsList: FC = () => {
  return (
    <Box
      sx={{
        pl: 2,
        pr: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ReservationItem
        propertyName="Test reservation property name"
        price={100}
      />{" "}
      <ReservationItem
        propertyName="Test reservation property name"
        price={100}
      />{" "}
      <ReservationItem
        propertyName="Test reservation property name"
        price={100}
      />{" "}
      <ReservationItem
        propertyName="Test reservation property name"
        price={100}
      />{" "}
      <ReservationItem
        propertyName="Test reservation property name"
        price={100}
      />{" "}
      <ReservationItem
        propertyName="Test reservation property name"
        price={100}
      />
    </Box>
  );
};

export default ReservationsList;
