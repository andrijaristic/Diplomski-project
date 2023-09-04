import { FC, useEffect, useState } from "react";
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import { IRoomSearchDisplay } from "../../shared/interfaces/roomInterfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { IJwt } from "../../shared/interfaces/userInterfaces";
import { INewReservation } from "../../shared/interfaces/reservationInterface";
import { createReservationAction } from "../../store/reservationSlice";
import ReservationModal from "../ReservationModal/ReservationModal";

interface IProps {
  room: IRoomSearchDisplay;
}

const DetailedListingRoomBooking: FC<IProps> = ({ room }) => {
  const dispatch = useAppDispatch();
  const stripeUrl = useAppSelector((state) => state.reservations.stripeUrl);
  const token = useAppSelector((state) => state.user.token);
  const { id: userId } = jwtDecode<IJwt>(token ? token : "");
  const { id: propertyId } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (stripeUrl === "") {
      return;
    }

    window.location.href = stripeUrl;
  }, [stripeUrl]);

  const handleReservationCreation = () => {
    const newReservation: INewReservation = {
      userId: userId,
      propertyId: propertyId ? propertyId : "",
      roomId: room?.id,
      price: room?.price,
      arrivalDate: room?.arrivalDate,
      departureDate: room?.departureDate,
    };

    console.log(newReservation);
    dispatch(createReservationAction(newReservation));
  };

  return (
    <Card
      sx={{ width: "60%", borderRadius: 2, p: 1, border: "1px solid black" }}
    >
      <Grid container direction="row">
        <Grid item xs={9}>
          <Grid container direction="column">
            <Box sx={{ width: "fit-content" }}>
              <Grid item>
                <Typography variant="h6">
                  {`${room?.roomType?.adults} Adults, ${room?.roomType?.children}
                   Children`}
                </Typography>
              </Grid>
              <Divider sx={{ width: "110%" }} />
            </Box>
            <Grid item>
              <Typography variant="subtitle1">{`${new Date(
                room?.arrivalDate
              ).toLocaleDateString()} - ${new Date(
                room?.departureDate
              ).toLocaleDateString()}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ ml: "auto", mr: 1 }}>Price</Typography>
              <Typography sx={{ ml: "auto", mr: 1 }}>${room?.price}</Typography>
            </Box>
            <Typography sx={{ ml: "auto", mr: 1 }}>
              <Button onClick={handleModalToggle}>Make reservation</Button>
            </Typography>
            {isOpen && (
              <ReservationModal
                open={isOpen}
                onClose={handleModalToggle}
                onOnlinePayment={handleReservationCreation}
                room={{
                  roomId: room.id,
                  arrivalDate: room.arrivalDate,
                  departureDate: room.departureDate,
                  price: room.price,
                  seasonalPricing: room.roomType.seasonalPricing,
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DetailedListingRoomBooking;
