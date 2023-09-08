import { FC, useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import PricingTable from "../../DetailedListing/PricingTable";
import StyledButton from "../../UI/Styled/StyledButton";
import { errorNotification } from "../../../utils/toastNotificationUtil";
import { IEditRoom } from "../../../shared/interfaces/roomInterfaces";
import {
  clearRooms,
  getAccommodationRoomsAction,
  updateRoomAction,
} from "../../../store/roomSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  height: "82%",
  minHeight: "10%",
  maxHeight: "82%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
};

interface IProps {
  open: boolean;
  accommodationId: string;
  roomId: string;
  roomTypeId: string;
  onClose: () => void;
}

const RoomEditModal: FC<IProps> = ({
  open,
  accommodationId,
  roomId,
  roomTypeId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const roomTypes = useAppSelector((state) => state.roomTypes.roomTypes);
  const [selectedRoomType, setSelectedRoomType] = useState<string>(roomTypeId);
  const [errorNotif, setErrorNotif] = useState<string>("");

  const handleRoomTypeChange = (event: SelectChangeEvent) => {
    setSelectedRoomType(event.target.value);
    if (event.target.value !== roomTypeId) {
      setErrorNotif("");
    } else {
      setErrorNotif("*Please change maximum capacity.");
    }
  };

  const roomTypeOptions: JSX.Element[] = roomTypes?.map((roomType) => {
    return (
      <MenuItem
        key={roomType.id}
        value={roomType.id}
      >{`${roomType.adults} Adults, ${roomType.children} Children`}</MenuItem>
    );
  });

  const handleRoomEdit = async () => {
    setErrorNotif("");

    if (selectedRoomType === roomTypeId) {
      setErrorNotif("*Please change maximum capacity.");
      return;
    }

    if (!accommodationId || !roomId) {
      errorNotification("Not all data was provided");
      return;
    }

    const editRoom: IEditRoom = {
      roomId: roomId,
      propertyId: accommodationId,
      roomTypeId: selectedRoomType,
    };

    const response = await dispatch(updateRoomAction(editRoom));
    if (response) {
      onClose();
      dispatch(clearRooms());
      dispatch(getAccommodationRoomsAction(accommodationId));
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-describedby="transition-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
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
            <Stack spacing={2}>
              <StyledButton onClick={handleRoomEdit}>
                Edit rooms' maximum capacity
              </StyledButton>
              <Box sx={{ width: "100%" }}>
                <Select
                  id="roomType"
                  name="roomType"
                  value={selectedRoomType.toString()}
                  onChange={handleRoomTypeChange}
                  sx={{ height: "100%", width: "inherit" }}
                >
                  {roomTypeOptions}
                </Select>
                {errorNotif && (
                  <Typography variant="subtitle1" sx={{ color: "red" }}>
                    {errorNotif}
                  </Typography>
                )}
              </Box>
              <PricingTable
                edit={false}
                roomType={roomTypes.filter((x) => x.id === selectedRoomType)[0]}
              />
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default RoomEditModal;
