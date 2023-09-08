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
import { grey } from "@mui/material/colors";
import { IRoom } from "../../shared/interfaces/roomInterfaces";

interface IProps {
  room: IRoom;
  onPriceView: () => void;
  onEdit: () => void;
}

const ViewRoomsItem: FC<IProps> = ({ room, onPriceView, onEdit }) => {
  const isReserved: boolean =
    room?.reservationAmount !== undefined && room?.reservationAmount > 0;

  const title: string = `${room?.roomType.adults} ${
    room?.roomType.adults === 1 ? "Adult" : "Adults"
  }, ${room?.roomType.children} ${
    room?.roomType.children === 1 ? "Child" : "Children"
  }`;

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
              <Stack>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="caption">{`ID: ${room?.id}`}</Typography>
              </Stack>
              <Typography
                variant="h5"
                color={`${isReserved ? "error" : "green"}`}
              >
                {isReserved ? "RESERVED" : "FREE"}
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6">Amount of reservations:</Typography>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {room?.reservationAmount}
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
          <Button variant="outlined" color="success" onClick={onPriceView}>
            View prices
          </Button>
          <Button variant="outlined" color="info" onClick={onEdit}>
            Edit room capacity
          </Button>
          {!isReserved && (
            <Button variant="outlined" color="error">
              Delete room
            </Button>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default ViewRoomsItem;
