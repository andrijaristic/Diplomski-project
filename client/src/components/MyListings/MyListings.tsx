import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import MyListingsItem from "./MyListingsItem";
import StyledButton from "../UI/Styled/StyledButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import EmptyArrayMessage from "../UI/EmptyArrayMessage/EmptyArrayMessage";
import jwtDecode from "jwt-decode";
import {
  clearOwnerAccommodations,
  deleteAccommodationAction,
  getUserAccommodationsAction,
} from "../../store/accommodationSlice";
import { IJwt } from "../../shared/interfaces/userInterfaces";
import ConfirmationModal from "../UI/Modal/ConfirmationModal";

const MyListings: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const userAccommodations = useAppSelector(
    (state) => state.accommodations.userAccommodations
  );
  const [refresh, setRefresh] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<string>("");
  const { id } = jwtDecode<IJwt>(token ?? "");

  useEffect(() => {
    if (!refresh) {
      return;
    }

    dispatch(clearOwnerAccommodations());
    dispatch(getUserAccommodationsAction(id));
    setRefresh(false);
  }, [refresh, id, dispatch]);

  const handleCreate = () => {
    navigate("/listings/new");
  };

  const handleDelete = async () => {
    if (selectedAccommodation) {
      const response = await dispatch(
        deleteAccommodationAction(selectedAccommodation)
      );
      if (response) {
        setOpen(false);
        setRefresh(true);
      }
    }
  };

  const handleModalToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleModalToggleAccommodation = (id: string) => () => {
    setOpen((prevState) => !prevState);
    setSelectedAccommodation(id);
  };

  const content: JSX.Element[] | undefined = userAccommodations?.map(
    (accommodation) => (
      <MyListingsItem
        key={accommodation.id}
        accommodation={accommodation}
        onDelete={handleModalToggleAccommodation(accommodation.id)}
      />
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
      {open && (
        <ConfirmationModal
          open={open}
          title="Delete accommodation?"
          content="Are you sure you wish to delete this accommodation? This cannot be undone"
          onClose={handleModalToggle}
          onClick={handleDelete}
        />
      )}
    </Box>
  );
};

export default MyListings;
