import { FC, useState } from "react";
import { Box, FormLabel, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import StyledButton from "../UI/Styled/StyledButton";
import { errorNotification } from "../../utils/toastNotificationUtil";
import { IRoomSearch } from "../../shared/interfaces/roomInterfaces";
import { useParams } from "react-router-dom";

interface IProps {
  onSearch: (booking: IRoomSearch) => void;
}

const DetailedListingSearchAction: FC<IProps> = ({ onSearch }) => {
  const { id } = useParams();
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const adults = data.get("adults");
    const children = data.get("children");

    if (adults === "0") {
      errorNotification("Please fill in the appropriate amount of adults");
      return;
    }

    if (!checkinDate || !checkoutDate) {
      errorNotification("Please fill in the appropriate dates of the trip");
      return;
    }

    const booking: IRoomSearch = {
      propertyId: id ? id : "",
      arrivalDate: new Date(checkinDate.setHours(12, 0, 0, 0)).toISOString(),
      departureDate: new Date(checkoutDate.setHours(12, 0, 0, 0)).toISOString(),
      adults: parseInt(adults as string),
      children: parseInt(children as string),
    };

    onSearch(booking);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: 2,
        pl: 0,
        gap: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "18%" }}>
        <FormLabel>Arrival date</FormLabel>
        <DatePicker
          disablePast
          value={checkinDate}
          onChange={(newValue) => {
            setCheckinDate(newValue);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "18%" }}>
        <FormLabel>Departure date</FormLabel>
        <DatePicker
          disablePast
          value={checkoutDate}
          onChange={(newValue) => {
            setCheckoutDate(newValue);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "10%" }}>
        <FormLabel>Adults</FormLabel>
        <TextField
          defaultValue={0}
          id="adults"
          name="adults"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "10%" }}>
        <FormLabel>Children</FormLabel>
        <TextField
          defaultValue={0}
          id="children"
          name="children"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Box>
      <StyledButton submit>Submit</StyledButton>
    </Box>
  );
};

export default DetailedListingSearchAction;
