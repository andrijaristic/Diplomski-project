import { FC } from "react";
import StyledButton from "../UI/Styled/StyledButton";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface IProps {
  sort: string;
  onChange: (event: SelectChangeEvent) => void;
}

const ListingActions: FC<IProps> = ({ sort, onChange }) => {
  return (
    <>
      <StyledButton sx={{ minWidth: "8rem", maxWidth: "fit-content" }}>
        Filters (opens modal)
      </StyledButton>
      <Box sx={{ ml: "auto", mr: 1, display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1 }}>Sort by</Typography>
        <Select id="sort-select" value={sort} onChange={onChange}>
          <MenuItem value="highest-price">Highest Price</MenuItem>
          <MenuItem value="lowest-price">Lowest Price</MenuItem>
          <MenuItem value="highest-rating">Highest Rating</MenuItem>
          <MenuItem value="lowest-rating">Lowest Rating</MenuItem>
        </Select>
      </Box>
    </>
  );
};

ListingActions.defaultProps = {
  sort: "highest-price",
};

export default ListingActions;
