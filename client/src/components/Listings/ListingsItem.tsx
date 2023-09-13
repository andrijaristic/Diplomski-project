import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import RoomIcon from "@mui/icons-material/Room";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import StyledButton from "../UI/Styled/StyledButton";
import { IAccommodationDisplay } from "../../shared/interfaces/accommodationInterfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleFavoriteStatusAction } from "../../store/accommodationSlice";

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
  favorites?: boolean;
  accommodation: IAccommodationDisplay;
  onClick?: (lat: number, lng: number) => void;
}

const ListingsItem: FC<IProps> = ({
  favorites = true,
  accommodation,
  onClick,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const [checked, setChecked] = useState<boolean>(
    accommodation?.isSaved || false
  );

  const handleCheck = () => {
    setChecked((prevState) => !prevState);
    dispatch(toggleFavoriteStatusAction(accommodation?.id));
  };

  const handleNavigationClick = () => {
    // navigate(`${pathname}/${accommodation?.id}`);
    navigate(`/listings/${accommodation?.id}`);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(accommodation.latitude, accommodation.longitude);
    }
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
        // "@media (max-width: 1468px)": {
        //   flexBasis: "32%",
        // },
        "@media (max-width: 1568px)": {
          flexBasis: "48%",
        },
        "@media (max-width: 1086px)": {
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
        {favorites && (
          <Tooltip title="Show location">
            <Card
              sx={{
                position: "absolute",
                top: 5,
                right: 10,
                borderRadius: 8,
                backgroundColor: "nav.default",
                "@media (max-width: 900px)": {
                  display: "none",
                },
              }}
            >
              <IconButton size="medium" onClick={handleClick}>
                <RoomIcon fontSize="inherit" color="info" />
              </IconButton>
            </Card>
          </Tooltip>
        )}
        {isLoggedIn && favorites && (
          <Tooltip title="Favorite listing">
            <Card
              sx={{
                position: "absolute",
                top: 5,
                right: 60,
                borderRadius: 8,
                backgroundColor: "nav.default",
                "@media (max-width: 900px)": {
                  right: 10,
                },
              }}
            >
              <Checkbox
                checked={checked}
                onChange={handleCheck}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                sx={{
                  color: red[800],
                  "&.Mui-checked": {
                    color: red[600],
                  },
                }}
              />
            </Card>
          </Tooltip>
        )}
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
            <Typography sx={{ ml: 1 }}>{`${accommodation?.averageGrade} (${
              accommodation?.comments
            } ${
              accommodation?.comments === 1 ? "review" : "reviews"
            })`}</Typography>
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
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Starting Price:
            </Typography>
            <EuroSymbolIcon fontSize="medium" />
            <Typography variant="h6" sx={{ mb: 0.2 }}>
              {accommodation?.startingPrice}
            </Typography>
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
