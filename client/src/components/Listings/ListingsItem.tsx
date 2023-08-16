import { FC } from "react";
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StyledButton from "../UI/Styled/StyledButton";

interface IProps {
  src: string;
  title: string;
  description: string;
  startingPrice: number;
  reviewAmount: number;
  rating: number;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography,
  overflow: "hidden",
  wordBreak: "break-word",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
}));

const ListingsItem: FC<IProps> = (props) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        flexBasis: "32.33%",

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
      <ButtonBase
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          height="260"
          alt="property-thumbnail"
          image="/header-background.jpg"
        ></CardMedia>
      </ButtonBase>

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
            <Typography sx={{ ml: 1 }}>{`${props.rating.toFixed(
              1
            )} (${props.reviewAmount.toFixed(0)} reviews)`}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              mt: 0.6,
              ml: 0.4,
              whiteSpace: "nowrap",
            }}
          >
            <StyledTypography>{props.title}</StyledTypography>
          </Grid>
          <Grid item sx={{ ml: 0.4, mb: 1 }}>
            <Box sx={{ height: 40 }}>
              <StyledTypography variant="body2">
                {props.description}
              </StyledTypography>
            </Box>
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <StyledButton sx={{ ml: "auto" }}>View Availability</StyledButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ListingsItem.defaultProps = {
  startingPrice: 0,
  title: "Placeholder title",
  description: "Placeholder description",
};

export default ListingsItem;
