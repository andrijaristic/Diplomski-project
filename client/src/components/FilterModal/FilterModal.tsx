import { FC, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Fade,
  FormHelperText,
  Grid,
  Modal,
  Slider,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { DatePicker } from "@mui/x-date-pickers";
import FilterModalSectionHeader from "./FilterModalSection";
import FilterModalAmenity from "./FilterModalAmenity";
import {
  minPrice as min,
  maxPrice as max,
  defaultGuests,
} from "../../constants/Constants";
import StyledButton from "../UI/Styled/StyledButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  height: "82%",
  minHeight: "10%",
  maxHeight: "82%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
};

interface IProps {
  open: boolean;
  onClose: () => void;
}

const DUMMY_AMENTIES = [
  {
    id: 1,
    name: "Dummy amenity",
  },
  {
    id: 2,
    name: "Dummy amenity",
  },
  {
    id: 3,
    name: "Dummy amenity",
  },
  {
    id: 4,
    name: "Dummy amenity",
  },
  {
    id: 5,
    name: "Dummy amenity",
  },
  {
    id: 6,
    name: "Dummy amenity",
  },
  {
    id: 7,
    name: "Dummy amenity",
  },
  {
    id: 8,
    name: "Dummy amenity",
  },
  {
    id: 9,
    name: "Dummy amenity",
  },
  {
    id: 10,
    name: "Dummy amenity",
  },
];

const FilterModal: FC<IProps> = (props) => {
  const [priceRange, setPriceRange] = useState<number[]>([min, max]);
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState<number>(defaultGuests);
  const [children, setChildren] = useState<number>(defaultGuests);
  const [checkedAmenities, setCheckedAmenities] = useState<number[]>([]);

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setPriceRange(newValue as number[]);
  };

  const handleAdultIncrement = () => {
    setAdults((prevAdults) => ++prevAdults);
  };

  const handleAdultDecrement = () => {
    setAdults((prevAdults) => (prevAdults === 0 ? prevAdults : --prevAdults));
  };

  const handleChildrenIncrement = () => {
    setChildren((prevChildren) => ++prevChildren);
  };

  const handleChildrenDecrement = () => {
    setChildren((prevChildren) =>
      prevChildren === 0 ? prevChildren : --prevChildren
    );
  };

  const handleAmenitiesCheckChange = (id: number) => () => {
    const exists: boolean =
      checkedAmenities.find((amenityId) => amenityId === id) !== undefined;

    if (exists)
      setCheckedAmenities((prevAmenities) =>
        prevAmenities.filter((amenityId) => amenityId !== id)
      );
    else
      setCheckedAmenities((prevAmenities) => {
        return [...prevAmenities, id];
      });
  };

  const amenities = DUMMY_AMENTIES.map((amenity) => (
    <FilterModalAmenity
      initialState={
        checkedAmenities.find((checked) => checked === amenity.id) !== undefined
      }
      id={amenity.id}
      key={amenity.id}
      name={amenity.name}
      onChange={handleAmenitiesCheckChange(amenity.id)}
    />
  ));

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-describedby="transition-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Box
            sx={{
              p: 4,
              width: 600,
              minHeight: 105,
              maxHeight: 705,
              overflow: "auto",
            }}
          >
            <Grid container direction="column">
              <Grid
                item
                sx={{
                  pb: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FilterModalSectionHeader
                  title="Select a date"
                  body="When do you want to travel?"
                />
                <Box
                  sx={{
                    pt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <FormHelperText>Arrival Date</FormHelperText>
                    <DatePicker
                      disablePast
                      sx={{ width: "11rem", mr: 1 }}
                      value={checkinDate}
                      onChange={(newValue) => setCheckinDate(newValue)}
                    />
                  </Box>
                  <Box>
                    {/* minDate for min. selectable date => Arrival Date will be that date  */}
                    <FormHelperText>Departure Date</FormHelperText>
                    <DatePicker
                      disablePast
                      minDate={checkinDate}
                      sx={{ width: "11rem", mr: 1 }}
                      defaultValue={checkoutDate}
                      onChange={(newValue) => setCheckoutDate(newValue)}
                    />
                  </Box>
                </Box>
              </Grid>
              <Divider />
              <Grid item sx={{ pt: 2, pb: 2 }}>
                <FilterModalSectionHeader title="Guests" />
                <Box
                  sx={{
                    display: "flex",
                    pt: 1,
                    pr: 0,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ pr: 1 }}>Adults</Typography>

                    <ButtonGroup sx={{ display: "flex", alignItems: "center" }}>
                      <Button
                        variant="contained"
                        onClick={handleAdultDecrement}
                      >
                        -
                      </Button>
                      <Typography sx={{ pl: 2, pr: 2 }}>{adults}</Typography>
                      <Button
                        variant="contained"
                        onClick={handleAdultIncrement}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: "auto",
                      pr: 1,
                    }}
                  >
                    <Typography sx={{ pr: 1 }}>Children</Typography>

                    <ButtonGroup sx={{ display: "flex", alignItems: "center" }}>
                      <Button
                        variant="contained"
                        onClick={handleChildrenDecrement}
                      >
                        -
                      </Button>
                      <Typography sx={{ pl: 2, pr: 2 }}>{children}</Typography>
                      <Button
                        variant="contained"
                        onClick={handleChildrenIncrement}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Box>
              </Grid>
              <Divider />
              <Grid item sx={{ pt: 2, pb: 2 }}>
                <FilterModalSectionHeader
                  title="Price range"
                  body="Select an average nightly price"
                />
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  min={min}
                  max={max}
                />
                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Box
                    sx={{
                      p: 4,
                      pt: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">Min. price</Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AttachMoneyIcon />
                      {priceRange[0]}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 4,
                      pt: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">Max. price</Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AttachMoneyIcon />
                      {priceRange[1]}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Divider />
              <Grid
                item
                sx={{
                  pt: 2,
                  pb: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FilterModalSectionHeader
                  title="Amenities"
                  body="Choose the amenities that are most important"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexGrow: 1,
                  }}
                >
                  {amenities}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ p: 2, display: "flex", minHeight: 100, maxHeight: 100 }}>
            <StyledButton sx={{ ml: "auto", width: "8rem", fontSize: 20 }}>
              Search
            </StyledButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default FilterModal;