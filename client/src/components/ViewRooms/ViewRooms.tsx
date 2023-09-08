import { FC, useState } from "react";
import { Box, Card, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import PricingTable from "../DetailedListing/PricingTable";
import ViewRoomsItem from "./ViewRoomsItem";
import NoRoomsMessage from "./NoRoomsMessage";
import { useAppSelector } from "../../store/hooks";

const ViewRooms: FC = () => {
  const rooms = useAppSelector((state) => state.rooms.rooms);
  const [pricesIndex, setPricesIndex] = useState<number>(0);

  const handlePriceChange = (index: number) => () => {
    setPricesIndex(index);
  };

  const content: JSX.Element[] = rooms?.map((room, index) => (
    <ViewRoomsItem
      key={room?.id}
      room={room}
      onPriceView={handlePriceChange(index)}
    />
  ));

  return (
    <Box
      sx={{
        p: 12,
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
          width: "24%",
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
          minWidth: "50%",
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
          {content.length > 0 ? content : <NoRoomsMessage />}
        </Box>
      </Card>
    </Box>
  );
};

export default ViewRooms;
