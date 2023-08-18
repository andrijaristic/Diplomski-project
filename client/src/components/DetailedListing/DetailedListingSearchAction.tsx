import { FC } from "react";
import { Box, FormLabel, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import StyledButton from "../UI/Styled/StyledButton";

const DetailedListingSearchAction: FC = () => {
  return (
    <Box
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
        <DatePicker disablePast />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "18%" }}>
        <FormLabel>Departure date</FormLabel>
        <DatePicker disablePast />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "10%" }}>
        <FormLabel>Adults</FormLabel>
        <TextField
          defaultValue={0}
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "10%" }}>
        <FormLabel>Children</FormLabel>
        <TextField
          defaultValue={0}
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Box>
      <StyledButton>Submit</StyledButton>
    </Box>
  );
};

export default DetailedListingSearchAction;
