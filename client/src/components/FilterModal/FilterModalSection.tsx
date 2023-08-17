import { FC } from "react";
import { Box, Typography } from "@mui/material";

interface IProps {
  title: string;
  body?: string;
}

const FilterModalSectionHeader: FC<IProps> = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mr: "auto" }}>
      <Typography variant="body1">{props.title}</Typography>
      <Typography variant="body2">{props.body}</Typography>
    </Box>
  );
};
export default FilterModalSectionHeader;
