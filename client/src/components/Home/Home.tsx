import { FC } from "react";
import { FormHelperText, InputAdornment, TextField } from "@mui/material";
import Fade from "@mui/material/Fade";
import BedIcon from "@mui/icons-material/Bed";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styles from "./Home.module.css";
import StyledButton from "../UI/Styled/StyledButton";
import PropertyPreview from "../PropertyPreview/PropertyPreview";

const DUMMY_DATA = [
  {
    id: 1,
    name: "First property",
    country: "Serbia",
    area: "Trstenik",
  },
  {
    id: 2,
    name: "Second property",
    country: "Serbia",
    area: "Trstenik",
  },
  {
    id: 3,
    name: "Third property",
    country: "Serbia",
    area: "Trstenik",
  },
  {
    id: 4,
    name: "Fourth property",
    country: "Serbia",
    area: "Trstenik",
  },
  {
    id: 5,
    name: "Fifth property",
    country: "Serbia",
    area: "Trstenik",
  },
];

const Home: FC = () => {
  const content = DUMMY_DATA.map((item) => {
    return (
      <PropertyPreview
        name={item.name}
        country={item.country}
        area={item.area}
      />
    );
  });

  return (
    <Fade in>
      <div>
        <section className={styles.image}>
          <div className={styles.image__filter}>
            <TextField
              variant="outlined"
              type="search"
              placeholder="Where to?"
              helperText="ex. Country, Area"
              sx={{ mr: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div>
              <DatePicker
                disablePast
                views={["day", "month", "year"]}
                sx={{ width: "11rem", mr: 1 }}
              />
              <FormHelperText sx={{ ml: 2 }}>Arrival Date</FormHelperText>
            </div>
            <div>
              <DatePicker
                disablePast
                views={["day", "month", "year"]}
                sx={{ width: "11rem", mr: 1 }}
              />
              <FormHelperText sx={{ ml: 2 }}>Departure Date</FormHelperText>
            </div>
            <StyledButton sx={{ height: "3.5rem" }}>Search</StyledButton>
          </div>
        </section>
        <section className={styles.card}>{content}</section>
      </div>
    </Fade>
  );
};

export default Home;
