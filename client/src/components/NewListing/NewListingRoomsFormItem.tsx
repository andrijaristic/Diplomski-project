import { FC } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";

interface IProps {
  id: string;
  to: Date;
  from: Date;
}

function formatDate(date: Date, isDay: boolean) {
  return isDay
    ? date.getDate().toString().padStart(2, "0")
    : (date.getMonth() + 1).toString().padStart(2, "0");
}

const NewListingRoomsFormItem: FC<IProps> = ({ id, to, from }) => {
  const startDate = `${formatDate(from, true)}/${formatDate(from, false)}`;
  const endDate = `${formatDate(to, true)}/${formatDate(to, false)}`;

  const label = `${startDate} - ${endDate} (${id})`;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "24rem" }}>
        <Typography variant="h6">{label}</Typography>
      </Box>
      <TextField
        id={id}
        name={id}
        type="number"
        defaultValue={0}
        variant="standard"
        InputProps={{
          inputProps: {
            min: 0,
          },
          startAdornment: (
            <InputAdornment position="start">
              <EuroIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default NewListingRoomsFormItem;
