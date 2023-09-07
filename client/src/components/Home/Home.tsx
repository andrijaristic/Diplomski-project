import { FC, useState } from "react";
import { Box, FormHelperText, InputAdornment, TextField } from "@mui/material";
import Fade from "@mui/material/Fade";
import BedIcon from "@mui/icons-material/Bed";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StyledButton from "../UI/Styled/StyledButton";
import PropertyPreview from "../PropertyPreview/PropertyPreview";
import styles from "./Home.module.css";
import { useAppSelector } from "../../store/hooks";
import { ISearchParams } from "../../shared/interfaces/accommodationInterfaces";
import { createSearchParams, useNavigate } from "react-router-dom";

const Home: FC = () => {
  const navigate = useNavigate();
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);

  const accommodations = useAppSelector(
    (state) => state.accommodations.accommodations
  );

  const content: JSX.Element[] | undefined = accommodations?.map(
    (accommodation) => {
      {
        return (
          <PropertyPreview
            key={accommodation?.id}
            id={accommodation?.id}
            name={accommodation?.name}
            country={accommodation?.country ? accommodation?.country : ""}
            area={accommodation?.area ? accommodation?.area : ""}
            imageURL={accommodation?.thumbnailImage?.imageURL}
          />
        );
      }
    }
  );

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const location = data.get("location");
    const country = location?.toString().split(",")[0];
    const area = location?.toString().split(",")[1];

    const searchParams: ISearchParams = {
      arrivalDate: checkinDate?.toISOString() || "",
      departureDate: checkoutDate?.toISOString() || "",
      country: country?.toString().trim() || "",
      area: area?.toString().trim() || "",
      page: 1,
    };

    navigate({
      pathname: "listings",
      search: createSearchParams({ ...searchParams }).toString(),
    });
  };

  return (
    <Fade in>
      <Box component="form" onSubmit={handleSearch}>
        <section className={styles.image}>
          <div className={styles.image__filter}>
            <TextField
              variant="outlined"
              type="search"
              name="location"
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
                value={checkinDate}
                onChange={(newValue) => setCheckinDate(newValue)}
                sx={{ width: "11rem", mr: 1 }}
              />
              <FormHelperText sx={{ ml: 2 }}>Arrival Date</FormHelperText>
            </div>
            <div>
              <DatePicker
                disablePast
                views={["day", "month", "year"]}
                defaultValue={checkoutDate}
                onChange={(newValue) => setCheckoutDate(newValue)}
                sx={{ width: "11rem", mr: 1 }}
              />
              <FormHelperText sx={{ ml: 2 }}>Departure Date</FormHelperText>
            </div>
            <StyledButton submit sx={{ height: "3.5rem" }}>
              Search
            </StyledButton>
          </div>
        </section>
        <section className={styles.card}>{content}</section>
      </Box>
    </Fade>
  );
};

export default Home;
