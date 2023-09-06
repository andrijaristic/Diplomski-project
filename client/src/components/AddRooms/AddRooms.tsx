import {
  Box,
  Card,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import PricingTable from "../DetailedListing/PricingTable";
import { grey } from "@mui/material/colors";
import StyledButton from "../UI/Styled/StyledButton";
import { errorNotification } from "../../utils/toastNotificationUtil";
import {
  INewRoomType,
  IRoomTypeAddDisplay,
} from "../../shared/interfaces/roomTypeInterfaces";
import { defaultFormErrorMessage } from "../../constants/Constants";
import { createNewRoomTypeAction } from "../../store/roomTypeSlice";
import { useParams } from "react-router-dom";
import { INewRoom } from "../../shared/interfaces/roomInterfaces";
import { createNewRoomsAction } from "../../store/roomSlice";

type DateField = {
  monthName: string;
  to: Date;
  from: Date;
};

function getMonthName(month: number) {
  const date = new Date();
  const fixedDate = new Date(date.setMonth(month, 1));
  return fixedDate.toLocaleString("default", { month: "long" });
}

function getMonths() {
  const date: Date = new Date(new Date());
  const months: DateField[] = [];
  for (let i = 0; i < 12; i++) {
    const month = i;
    months.push({
      monthName: getMonthName(month),
      from: new Date(date.getFullYear(), month, 1, 12, 0, 0, 0),
      to: new Date(date.getFullYear(), month + 1, 0, 12, 0, 0, 0),
    });
  }

  return months;
}

const AddRooms: FC = () => {
  const { id: accommodationId } = useParams();
  const dispatch = useAppDispatch();
  const roomTypes = useAppSelector((state) => state.roomTypes.roomTypes);

  const [selectedRoomType, setSelectedRoomType] = useState<number>(0);

  const months: DateField[] = useMemo(() => {
    return getMonths();
  }, []);

  const pricings: IRoomTypeAddDisplay[] = months.map((month) => {
    return { id: month.monthName, startDate: month.from, endDate: month.to };
  });

  const roomTypeOptions: JSX.Element[] = roomTypes?.map((roomType, index) => {
    return (
      <MenuItem
        key={roomType.id}
        value={index}
      >{`${roomType.adults} Adults, ${roomType.children} Children`}</MenuItem>
    );
  });

  const handleRoomChange = (event: SelectChangeEvent) => {
    setSelectedRoomType(parseInt(event.target.value));
  };

  const handleRoomAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const amountOfRooms = data.get("amountOfRooms");

    if (typeof amountOfRooms === "string" && parseInt(amountOfRooms) <= 0) {
      errorNotification("Please fill in a proper number of rooms");
      return;
    }

    const newRoom: INewRoom = {
      amountOfRooms: parseInt(amountOfRooms as string),
      propertyId: accommodationId ? accommodationId : "",
      roomTypeId: roomTypes[selectedRoomType]?.id,
    };

    dispatch(createNewRoomsAction(newRoom));
  };

  const handleRoomTypeCreation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const amountOfRooms = data.get("amountOfRooms");
    const adults = data.get("adults");
    const children = data.get("children");

    data.delete("roomNumber");
    data.delete("adults");
    data.delete("children");

    if (amountOfRooms === "0" || adults === "0") {
      errorNotification(defaultFormErrorMessage);
      return;
    }

    const seasonalPricings: any[] = [];
    for (const month of data.entries()) {
      if (month[1] === "0") {
        errorNotification("Please fill in all price fields");
        return;
      }

      const foundMonth: DateField | undefined = months.find(
        (el) => el.monthName === month[0]
      );

      if (foundMonth && foundMonth !== undefined) {
        seasonalPricings.push({
          startDate: foundMonth["from"],
          endDate: foundMonth["to"],
          price: parseInt(month[1] as string),
        });
      }
    }

    const newRoomType: INewRoomType = {
      adults: adults,
      children: children,
      amountOfRooms: amountOfRooms,
      propertyId: accommodationId,
      seasonalPricing: seasonalPricings,
    };

    console.log(newRoomType);
    dispatch(createNewRoomTypeAction(newRoomType));
  };

  return (
    <Box
      sx={{
        p: 12,
        pt: 8,
        display: "flex",
        flexDirection: "row",
        gap: 6,
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          height: 710,
          border: `1px solid ${grey[400]}`,
        }}
      >
        <Paper sx={{ height: 8, bgcolor: "secondary.main" }} />
        <Box component="form" onSubmit={handleRoomAdd} sx={{ p: 4, pt: 2 }}>
          <StyledButton
            submit
            disabled={roomTypes.length === 0}
            sx={{ mb: 1, width: "100%" }}
          >
            {roomTypes.length > 0
              ? "Add more rooms"
              : "No room types to choose"}
          </StyledButton>
          <Box sx={{ pb: 2, display: "flex", gap: 2 }}>
            <TextField
              required
              id="amountOfRooms"
              name="amountOfRooms"
              label="Amount of rooms"
              variant="outlined"
              helperText="*Required"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
            />
            <Select
              id="roomType"
              value={selectedRoomType.toString()}
              onChange={handleRoomChange}
              sx={{ height: "100%" }}
            >
              {roomTypeOptions}
            </Select>
          </Box>
          <PricingTable
            edit={false}
            roomType={roomTypes && roomTypes[selectedRoomType]}
          />
        </Box>
      </Card>
      <Card
        sx={{
          width: "70%",
          minWidth: "50%",
          borderRadius: 4,
          border: `1px solid ${grey[400]}`,
        }}
      >
        <Paper sx={{ height: 8, bgcolor: "secondary.main" }}></Paper>
        <Box
          component="form"
          onSubmit={handleRoomTypeCreation}
          sx={{ p: 4, pt: 2 }}
        >
          <StyledButton submit sx={{ mb: 1, width: "100%" }}>
            Add rooms with new room type
          </StyledButton>
          <Box sx={{ pb: 2, display: "flex", gap: 2 }}>
            <TextField
              required
              id="amountOfRooms"
              name="amountOfRooms"
              label="Amount of rooms"
              variant="outlined"
              type="number"
              helperText="*Required"
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ flexBasis: "33.333%" }}
            />
            <TextField
              required
              id="adults"
              name="adults"
              label="Amount of adult guests"
              variant="outlined"
              type="number"
              helperText="*Required"
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ flexBasis: "33.333%" }}
            />
            <TextField
              required
              id="children"
              name="children"
              label="Amount of child guests"
              variant="outlined"
              type="number"
              helperText="*Required"
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ flexBasis: "33.333%" }}
            />
          </Box>
          <PricingTable edit={false} addRoomForm pricings={pricings} />
        </Box>
      </Card>
    </Box>
  );
};

export default AddRooms;
