import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RoomIcon from "@mui/icons-material/Room";
import StyledButton from "../UI/Styled/StyledButton";
import { IAccommodationDisplay } from "../../shared/interfaces/accommodationInterfaces";

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
  accommodation: IAccommodationDisplay;
  onClick: (lat: number, lng: number) => void;
}

const ListingsItem: FC<IProps> = ({ accommodation, onClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleNavigationClick = () => {
    navigate(`${pathname}/${accommodation?.id}`);
  };

  const handleClick = () => {
    onClick(accommodation.latitude, accommodation.longitude);
  };

  const image =
    accommodation?.thumbnailImage !== null
      ? accommodation?.thumbnailImage.imageURL
      : "/header-background.jpg";

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        flexBasis: "32.33%",
        height: "100%",

        borderRadius: 2,
        // ml: "auto",
        // mr: "auto",
        "@media (max-width: 1468px)": {
          flexBasis: "32%",
        },
        "@media (max-width: 1260px)": {
          flexBasis: "48%",
        },
        "@media (max-width: 846px)": {
          flexBasis: "98%",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          height="260"
          alt="property-thumbnail"
          image={image}
        />
        <Tooltip title="Show location">
          <Card
            sx={{
              position: "absolute",
              top: 5,
              right: 10,
              borderRadius: 8,
              backgroundColor: "nav.default",
            }}
          >
            <IconButton size="medium" onClick={handleClick}>
              <RoomIcon fontSize="inherit" color="info" />
            </IconButton>
          </Card>
        </Tooltip>
        {/* <Card
          sx={{
            position: "absolute",
            top: 5,
            right: 60,
            borderRadius: 8,
            backgroundColor: "nav.default",
          }}
        >
          <IconButton size="medium">
            <RoomIcon fontSize="inherit" color="info" />
          </IconButton>
        </Card> */}
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Grid container direction="column" sx={{ display: "flex" }}>
          <Grid item sx={{ display: "flex" }}>
            <StarIcon sx={{ color: "primary.main" }} />
            <Typography
              sx={{ ml: 1 }}
            >{`${accommodation?.averageGrade} (${accommodation?.comments} reviews)`}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              mt: 0.6,
              ml: 0.4,
              whiteSpace: "nowrap",
            }}
          >
            <StyledTypography>{accommodation?.name}</StyledTypography>
          </Grid>
          <Grid item sx={{ ml: 0.4, mb: 1 }}>
            <Box sx={{ height: 40 }}>
              <StyledTypography variant="body2">
                {accommodation?.description}
              </StyledTypography>
            </Box>
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <StyledButton onClick={handleNavigationClick} sx={{ ml: "auto" }}>
              View Availability
            </StyledButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ListingsItem;
