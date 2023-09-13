import { FC } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircleRounded";

interface IProps {
  name: string;
}

const DetailedListingAmenity: FC<IProps> = ({ name }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexBasis: "24%",
    }}
  >
    <CheckCircleIcon color="success" />
    <Typography variant="subtitle1">{name || "Amenity name"}</Typography>
  </Box>
);

export default DetailedListingAmenity;
