import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import MyListingsItem from "./MyListingsItem";
import StyledButton from "../UI/Styled/StyledButton";

const MyListings: FC = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/listings/new");
  };

  return (
    <Box
      sx={{
        pt: 2,
        pb: 2,
        pr: 1,
        pl: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <StyledButton
        onClick={handleCreate}
        sx={{ ml: "auto", width: "fit-content" }}
      >
        Create new property listing
      </StyledButton>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <MyListingsItem />
        <MyListingsItem />
        <MyListingsItem />
        <MyListingsItem />
      </Box>
    </Box>
  );
};

export default MyListings;
