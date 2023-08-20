import { FC } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircleRounded";

const DetailedListingAmenity: FC = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexBasis: "24%",
    }}
  >
    <CheckCircleIcon color="success" />
    <Typography variant="subtitle1">Amenity name</Typography>
  </Box>
);

export default DetailedListingAmenity;
