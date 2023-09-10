import { FC, useState } from "react";
import StyledButton from "../UI/Styled/StyledButton";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import FilterModal from "../FilterModal/FilterModal";

interface IProps {
  sort: string;
  onChange: (event: SelectChangeEvent) => void;
}

const ListingActions: FC<IProps> = ({ sort, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <StyledButton
        sx={{ minWidth: "8rem", maxWidth: "fit-content" }}
        onClick={handleModalToggle}
      >
        Filters (opens modal)
      </StyledButton>
      <Box sx={{ ml: "auto", mr: 3, display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1 }}>Sort by</Typography>
        <Select id="sortSelect" value={sort} onChange={onChange}>
          <MenuItem value="HighestPrice">Highest Price</MenuItem>
          <MenuItem value="LowestPrice">Lowest Price</MenuItem>
          <MenuItem value="HighestRating">Highest Rating</MenuItem>
          <MenuItem value="LowestRating">Lowest Rating</MenuItem>
        </Select>
      </Box>
      <FilterModal open={isOpen} onClose={handleModalToggle} />
    </>
  );
};

ListingActions.defaultProps = {
  sort: "highest-price",
};

export default ListingActions;
