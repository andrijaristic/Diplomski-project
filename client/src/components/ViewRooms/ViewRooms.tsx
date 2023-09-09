import { FC, useState } from "react";
import { Box, Card, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import PricingTable from "../DetailedListing/PricingTable";
import ViewRoomsItem from "./ViewRoomsItem";
import NoRoomsMessage from "./NoRoomsMessage";
import { useAppSelector } from "../../store/hooks";
import RoomEditModal from "./RoomEditModal/RoomEditModal";
import { ApiCallState } from "../../shared/types/enumerations";
import ViewRoomsSkeleton from "./ViewRoomsSkeleton";

interface IProps {
  id: string;
}

const ViewRooms: FC<IProps> = ({ id }) => {
  const rooms = useAppSelector((state) => state.rooms.rooms);
  const apiState = useAppSelector((state) => state.rooms.apiState);
  const [pricesIndex, setPricesIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<string>("");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");

  const handlePriceChange = (index: number) => () => {
    setPricesIndex(index);
  };

  const handleModalToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleModalOpen = (roomTypeId: string, roomId: string) => () => {
    setSelectedRoomTypeId(roomTypeId);
    setSelectedRoomId(roomId);
    setOpen((prevState) => !prevState);
  };

  const content: JSX.Element[] = rooms?.map((room, index) => (
    <ViewRoomsItem
      key={room.id}
      room={room}
      onPriceView={handlePriceChange(index)}
      onEdit={handleModalOpen(room.roomType.id, room.id)}
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
