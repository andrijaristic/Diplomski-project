import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import MyListingsItem from "./MyListingsItem";
import StyledButton from "../UI/Styled/StyledButton";
import { useAppSelector } from "../../store/hooks";
import EmptyArrayMessage from "../UI/EmptyArrayMessage/EmptyArrayMessage";

const MyListings: FC = () => {
  const navigate = useNavigate();
  const userAccommodations = useAppSelector(
    (state) => state.accommodations.userAccommodations
  );

  const handleCreate = () => {
    navigate("/listings/new");
  };

  const content: JSX.Element[] | undefined = userAccommodations?.map(
    (accommodation) => (
      <MyListingsItem key={accommodation.id} accommodation={accommodation} />
    )
  );

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
        {content.length > 0 ? (
          content
        ) : (
          <EmptyArrayMessage
            message="Oops! You don't have any accommodations listed"
            secondary="Try posting some by clicking on the provided button!"
          />
        )}
      </Box>
    </Box>
  );
};

export default MyListings;
