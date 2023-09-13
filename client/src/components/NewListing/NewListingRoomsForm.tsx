import { FC, useMemo } from "react";
import {
  Box,
  Button,
  Divider,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import NewListingRoomsFormItem from "./NewListingRoomsFormItem";
import StyledButton from "../UI/Styled/StyledButton";
import { errorNotification } from "../../utils/toastNotificationUtil";
import { defaultFormErrorMessage } from "../../constants/Constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createNewRoomTypeAction } from "../../store/roomTypeSlice";
import { INewRoomType } from "../../shared/interfaces/roomTypeInterfaces";

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
  const date: Date = new Date();
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

const NewListingRoomsForm: FC = () => {
  const dispatch = useAppDispatch();
  const accommodationId = useAppSelector(
    (state) => state.accommodations.createdAccommodationId
  );

  const months: DateField[] = useMemo(() => {
    return getMonths();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const amountOfRooms = data.get("roomNumber");
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
      adults: parseInt(adults as string) ?? 1,
      children: parseInt(children as string) ?? 1,
      amountOfRooms: parseInt(amountOfRooms as string) ?? 1,
      accommodationId: accommodationId ?? "",
      seasonalPricing: seasonalPricings,
    };

    console.log(newRoomType);
    await dispatch(createNewRoomTypeAction(newRoomType));
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        pl: "10%",
        pb: "10%",
        gap: 2,
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", width: "fit-content" }}
      >
        <InputLabel>Amount of rooms</InputLabel>
        <TextField
          id="roomNumber"
          name="roomNumber"
          type="number"
          defaultValue={0}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <InputLabel>Adults</InputLabel>
          <TextField
            id="adults"
            name="adults"
            type="number"
            defaultValue={0}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <InputLabel>Children</InputLabel>
          <TextField
            id="children"
            name="children"
            type="number"
            defaultValue={0}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Box>
      </Box>
      <Divider />
      <Typography variant="h5">Monthly room pricings</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {months.map((month) => (
          <NewListingRoomsFormItem
            key={month.monthName}
            id={month.monthName}
            to={month.to}
            from={month.from}
          />
        ))}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            pt: 2,
            gap: 2,
          }}
        >
          <StyledButton submit sx={{ width: "fit-content" }}>
            Create room(s)
          </StyledButton>
          <Button
            type="reset"
            startIcon={<RestoreIcon />}
            sx={{ width: "fit-content", pl: 2 }}
          >
            Clear form
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewListingRoomsForm;
