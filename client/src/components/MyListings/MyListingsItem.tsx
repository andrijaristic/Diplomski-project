import { FC } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IAccommodationMinimal } from "../../shared/interfaces/accommodationInterfaces";

const StyledTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography,
  overflow: "hidden",
  wordBreak: "break-word",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
}));

interface IProps {
  accommodation: IAccommodationMinimal;
}

const MyListingsItem: FC<IProps> = ({ accommodation }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/listings/${accommodation.id}`);
  };

  const handleEdit = () => {
    navigate(`/listings/${accommodation.id}/edit`);
  };

  const handleDelete = () => {
    // API Call to delete
  };

  const handleAddRooms = () => {
    navigate(`/listings/${accommodation?.id}/add-rooms`);
  };

  const handleViewRooms = () => {
    navigate(`/listings/${accommodation?.id}/rooms`);
  };

  const image =
    accommodation?.thumbnailImage !== null
      ? accommodation?.thumbnailImage?.imageURL
      : "/header-background.jpg";

  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="property-thumbnail"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {accommodation?.name}
        </Typography>
        <StyledTypography variant="body2" color="text.secondary">
          {accommodation?.description}
        </StyledTypography>
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button size="medium" onClick={handleAddRooms}>
              Add rooms
            </Button>
            <Button size="medium" onClick={handleViewRooms}>
              View rooms
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button size="medium" onClick={handleView}>
              View property
            </Button>
            <Button size="medium" onClick={handleEdit}>
              Edit property
            </Button>
            <Button size="medium" color="error" onClick={handleDelete}>
              Delete property
            </Button>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default MyListingsItem;
