import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import PricingTable from "../DetailedListing/PricingTable";
import ViewRoomsItem from "./ViewRoomsItem";
import NoRoomsMessage from "./NoRoomsMessage";
import ViewRoomsSkeleton from "./ViewRoomsSkeleton";
import RoomEditModal from "./RoomEditModal/RoomEditModal";
import StyledButton from "../UI/Styled/StyledButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ApiCallState } from "../../shared/types/enumerations";
import { clearRooms, getAccommodationRoomsAction } from "../../store/roomSlice";

interface IProps {
  id: string;
}

const ViewRooms: FC<IProps> = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.rooms.rooms);
  const apiState = useAppSelector((state) => state.rooms.apiState);
  const [pricesIndex, setPricesIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<string>("");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");

  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (!refresh) {
      return;
    }

    dispatch(clearRooms());
    dispatch(getAccommodationRoomsAction(id));
    setRefresh(false);
  }, [refresh, id, dispatch]);

  const handlePriceChange = (index: number, roomId: string) => () => {
    setPricesIndex(index);
    setSelectedRoomId(roomId);
  };

  const handleModalToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleModalOpen =
    (index: number, roomTypeId: string, roomId: string) => () => {
      setPricesIndex(index);
      setSelectedRoomId(roomId);
      setSelectedRoomTypeId(roomTypeId);
      setOpen((prevState) => !prevState);
    };

  const handleAddRooms = () => {
    navigate(`/listings/${id}/add-rooms`);
  };

  const content: JSX.Element[] = rooms?.map((room, index) => (
    <ViewRoomsItem
      key={room.id}
      room={room}
      accommodationId={id}
      isSelected={selectedRoomId === room.id}
      onRefresh={() => {
        setRefresh(true);
      }}
      onPriceView={handlePriceChange(index, room.id)}
      onEdit={handleModalOpen(index, room.roomType.id, room.id)}
    />
  ));

  const displayContent =
    apiState === ApiCallState.PENDING ? (
      <ViewRoomsSkeleton />
    ) : content.length > 0 ? (
      content
    ) : (
      <NoRoomsMessage />
    );

  return (
    <Box
      sx={{
        p: 8,
        pt: 8,
        display: "flex",
        flexDirection: "row-reverse",
        gap: 6,
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          height: 640,
          width: 500,
          border: `1px solid ${grey[400]}`,
        }}
      >
        <Paper sx={{ height: 8, bgcolor: "secondary.main" }} />
        <Box component="form" sx={{ p: 4, pt: 2 }}>
          <PricingTable edit={false} roomType={rooms[pricesIndex]?.roomType} />
          <StyledButton sx={{ mt: 4, width: "100%" }} onClick={handleAddRooms}>
            Add new rooms
          </StyledButton>
        </Box>
      </Card>
      <Card
        sx={{
          width: "70%",
          minWidth: "40%",
          height: 680,
          overflow: "auto",
          borderRadius: 4,
          border: `1px solid ${grey[400]}`,
        }}
      >
        <Paper sx={{ height: 8, bgcolor: "secondary.main" }}></Paper>
        <Box
          sx={{ p: 4, pt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {displayContent}
        </Box>
      </Card>
      {open && (
        <RoomEditModal
          open={open}
          onClose={handleModalToggle}
          accommodationId={id}
          roomId={selectedRoomId}
          roomTypeId={selectedRoomTypeId}
        />
      )}
    </Box>
  );
};

export default ViewRooms;
