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

interface IProps {
  name: string;
  country: string;
  area: string;
}

const PropertyPreview: FC<IProps> = ({ name, country, area }) => {
  return (
    <Slide direction="left" in>
      <Card
        sx={{
          width: 320,
          borderRadius: 2,
        }}
      >
        <ButtonBase
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
          <div className={styles.container__information}>
            <Typography>{name}</Typography>
            <FormHelperText>
              {country}, {area}
            </FormHelperText>
          </div>
          <div className={styles.container__price}>
            <Typography>Starting price</Typography>
            <Typography sx={{ ml: "auto" }}>$100</Typography>
          </div>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default PropertyPreview;
