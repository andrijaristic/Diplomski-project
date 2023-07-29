import { FC } from "react";
import { FormHelperText, InputAdornment, TextField } from "@mui/material";
import Fade from "@mui/material/Fade";
import BedIcon from "@mui/icons-material/Bed";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styles from "./Home.module.css";
import StyledButton from "../UI/Styled/StyledButton";

const Home: FC = () => {
  return (
    <Fade in>
      <div>
        <div className={styles.image}>
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
        </div>
        <div className={styles.card}>Something</div>
      </div>
    </Fade>
  );
};

export default Home;
