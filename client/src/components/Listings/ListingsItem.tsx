import { FC } from "react";
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StyledButton from "../UI/Styled/StyledButton";

interface IProps {
  src: string;
  title: string;
  description: string;
  startingPrice: number;
  rating: number;
}

const ListingsItem: FC<IProps> = (props) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "30rem",
        height: "auto",

        borderRadius: 2,
        mb: 2,
        mt: 2,
        mr: 2,
        "@media (max-width: 846px)": {
          width: 640,
          m: 0,
          p: 0,
          mb: 4,
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
            )} (x reviews)`}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              mt: 0.6,
              ml: 0.4,
              whiteSpace: "nowrap",
            }}
          >
            <Typography
              sx={{
                overflow: "hidden",
                wordBreak: "break-word",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {props.title}
            </Typography>
          </Grid>
          <Grid item sx={{ ml: 0.4, mb: 4 }}>
            <Box sx={{ height: 40 }}>
              <Typography
                sx={{
                  overflow: "hidden",
                  wordBreak: "break-word",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {props.description}
              </Typography>
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
