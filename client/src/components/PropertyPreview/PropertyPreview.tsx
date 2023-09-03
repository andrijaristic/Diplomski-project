import { FC } from "react";
import {
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  FormHelperText,
  Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import styles from "./PropertyPreview.module.css";
import { useNavigate } from "react-router-dom";

interface IProps {
  id: string;
  name: string;
  country: string;
  area: string;
  imageURL: string;
}

const PropertyPreview: FC<IProps> = ({ id, name, country, area, imageURL }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`listings/${id}`);
  };
  return (
    <Slide direction="left" in>
      <Card
        sx={{
          width: 320,
          borderRadius: 2,
          mb: 2,
          mt: 2,
          ml: 2,
          "@media (max-width: 846px)": {
            width: 640,
            m: 0,
            p: 0,
            mb: 4,
          },
        }}
      >
        <ButtonBase
          onClick={handleNavigation}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            height="164"
            alt="property-thumbnail"
            image={imageURL}
          ></CardMedia>
        </ButtonBase>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.container__information}>
            <Typography>{name}</Typography>
            <FormHelperText>
              {country}, {area}
            </FormHelperText>
          </div>
          <div className={styles.container__price}>
            <Typography
              sx={{
                ml: "auto",
              }}
            >
              Starting price
            </Typography>
            <Typography sx={{ ml: "auto" }}>$100</Typography>
          </div>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default PropertyPreview;
