import { FC } from "react";
import {
  Backdrop,
  Box,
  Divider,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import StyledButton from "../UI/Styled/StyledButton";
import { IRoomModal } from "../../shared/interfaces/roomInterfaces";
import { useAppSelector } from "../../store/hooks";

interface IProps {
  open: boolean;
  onClose: () => void;
  room: IRoomModal;
  onOnlinePayment: () => void;
  onInPersonPayment: () => void;
}

const style = {
  position: "absolute",
  top: "46%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  height: "70%",
  minHeight: "10%",
  maxHeight: "62%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
};

const getAmountOfDays = (startDate: Date, endDate: Date) => {
  const time = 1000 * 3600 * 24;
  return (endDate.getTime() - startDate.getTime()) / time;
};

const ReservationModal: FC<IProps> = (props) => {
  const { name: accommodationName } = useAppSelector(
    (state) => state.accommodations.detailedAccommodation
  );
  const reservedDays = `${new Date(
    props.room?.arrivalDate
  ).toLocaleDateString()} - ${new Date(
    props.room?.departureDate
  ).toLocaleDateString()}`;
  const amountOfDaysReserved = getAmountOfDays(
    new Date(props.room.arrivalDate),
    new Date(props.room.departureDate)
  );
  const pricings: JSX.Element[] = props?.room?.seasonalPricing.map(
    (pricing) => {
      return (
        <Typography key={pricing.id} variant="body1">
          {`${new Date(pricing.endDate).toLocaleDateString("default", {
            month: "long",
          })} daily rate: $${pricing.price}`}
        </Typography>
      );
    }
  );

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-describedby="transition-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Box
            sx={{
              p: 4,
              width: 600,
              maxWidth: 800,
              height: "100%",
              minHeight: 105,
              maxHeight: 805,
              overflow: "auto",
            }}
          >
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h5">{accommodationName}</Typography>
              </Grid>
              <Grid item sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body1">
                    Your rooms' identification number
                  </Typography>
                  <Typography variant="subtitle2">
                    {props.room?.roomId}
                  </Typography>
                </Box>
              </Grid>
              <Divider />
              <Grid item sx={{ mt: 2, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="h5">Total price amount:</Typography>
                  <Typography variant="h5">${props.room?.price}</Typography>
                </Box>
              </Grid>
              <Divider />
              <Grid item sx={{ mt: 2, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h5">Nights stayed: </Typography>
                  <Typography variant="h5">{amountOfDaysReserved}</Typography>
                  <Typography variant="subtitle1">
                    (including weekends)
                  </Typography>
                </Box>
                <Typography variant="subtitle2">{reservedDays}</Typography>
              </Grid>
              <Divider />
              <Grid item sx={{ mt: 2, mb: 2 }}>
                <Typography variant="h6">Monthly pricings used</Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {pricings}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              p: 2,
              display: "flex",
              minHeight: 100,
              maxHeight: 100,
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <StyledButton
                onClick={props.onInPersonPayment}
                sx={{ ml: "auto", height: "100%" }}
              >
                Reserve with pay on arrival
              </StyledButton>
            </Box>
            <StyledButton onClick={props.onOnlinePayment}>
              Reserve with online payment
            </StyledButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ReservationModal;
