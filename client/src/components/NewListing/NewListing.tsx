import { FC, useEffect, useRef, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import UserInformationField from "../UserInformation/UserInformationField";
import { ApiCallState, HookTypes } from "../../shared/types/enumerations";
import {
  defaultCoordinateErrorMessage,
  defaultFormErrorMessage,
  defaultLat,
  defaultLng,
  minTextInputLength,
} from "../../constants/Constants";
import AddImagePicker from "../EditListing/AddImagePicker";
import StyledButton from "../UI/Styled/StyledButton";
import Search from "./MapSearchBox";
import { errorNotification } from "../../utils/toastNotificationUtil";
import { INewProperty } from "../../shared/interfaces/propertyInterfaces";
import NewListingRoomsForm from "./NewListingRoomsForm";

const NewListing: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [dummyApiState, setDummyApiState] = useState<ApiCallState>(
    ApiCallState.PENDING
  );

  useEffect(() => {
    if (dummyApiState === ApiCallState.COMPLETED) {
      setActiveStep((prevStep) => ++prevStep);
    }
  }, [dummyApiState]);

  const imageInput = useRef<HTMLInputElement>(null);
  const [displayImage, setDisplayImage] = useState<string | undefined>("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const [country, setCountry] = useState<string>("");
  const [area, setArea] = useState<string>("");

  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: defaultLat,
    lng: defaultLng,
  });

  const imageUploadHandler = () => {
    if (!imageInput.current) {
      return;
    }

    (imageInput.current.children[0] as HTMLInputElement).click();
  };

  const imageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      setUploadedImage(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDisplayImage(reader.result?.toString());
      };
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("title");
    const description = data.get("description");
    const country = data.get("country");
    const area = data.get("area");

    if (!name || !description || !country || !area || !uploadedImage) {
      errorNotification(defaultFormErrorMessage);
      return;
    }

    if (coords.lat === defaultLat && coords.lng === defaultLng) {
      errorNotification(defaultCoordinateErrorMessage);
      return;
    }

    // appropriate type
    const newProperty: INewProperty = {
      userId: 1,
      name: name.toString().trim(),
      description: description.toString().trim(),
    };

    if (uploadedImage) {
      newProperty.thumbnail = uploadedImage;
    }

    console.log(newProperty);
    setDummyApiState(ApiCallState.COMPLETED);
  };

  const handleNextStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    activeStep < 2 && setActiveStep((prevStep) => ++prevStep);

    const data = new FormData(event.currentTarget);
    const formCountry = data.get("country");
    const formArea = data.get("area");

    if (formCountry && formArea) {
      setCountry(formCountry.toString().trim());
      setArea(formArea.toString().trim());
    }
  };

  const handleBackStep = () => {
    activeStep > 0 && setActiveStep((prevStep) => --prevStep);
  };

  // lat - lon
  const position = [51.505, -0.09];

  // gets lat-lon on click
  const MapEvents = () => {
    const map = useMap();
    useMapEvents({
      click(e) {
        // setState your coords here
        // coords exist in "e.latlng.lat" and "e.latlng.lng"

        if (coords !== undefined) {
          L.marker([coords.lat, coords.lng]).removeFrom(map);
        }

        L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return false;
  };

  // Fixes map not rendering properly on load
  // by forcing it to resize
  const ResizeMap = () => {
    const map = useMap();
    map._onResize();
    return null;
  };

  return (
    <Box sx={{ pt: 4 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>Add basic property information</StepLabel>
            </Step>
            <Step>
              <StepLabel>Find your location</StepLabel>
            </Step>
            <Step>
              <StepLabel>Add some available rooms</StepLabel>
            </Step>
          </Stepper>
        </Grid>
        <Grid item>
          <Box
            component="form"
            onSubmit={activeStep === 0 ? handleNextStep : handleFormSubmit}
            sx={{ display: "flex", flexDirection: "row", gap: 8 }}
          >
            {/* Step 1 - Basic information */}
            <Box
              sx={{
                width: "40%",
                ml: "11%",
                display: activeStep === 0 ? "flex" : "none",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <StyledButton submit sx={{ width: "fit-content" }}>
                Next step
              </StyledButton>
              <UserInformationField
                disabled
                id="title"
                label="Your property name"
                type={HookTypes.TEXT}
                minChars={minTextInputLength}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <UserInformationField
                  disabled
                  id="country"
                  label="Country of property"
                  type={HookTypes.TEXT}
                  minChars={minTextInputLength}
                />
                <UserInformationField
                  disabled
                  id="area"
                  label="Area of country"
                  type={HookTypes.TEXT}
                  minChars={minTextInputLength}
                />
              </Box>
              <UserInformationField
                disabled
                id="description"
                label="Your property description"
                type={HookTypes.TEXT}
                minChars={minTextInputLength}
                minRows={6}
              />
            </Box>
            <Box
              sx={{
                display: activeStep === 0 ? "flex" : "none",
                flexDirection: "column",
              }}
            >
              <AddImagePicker
                header={false}
                image={displayImage}
                imageInput={imageInput}
                uploadHandler={imageChangeHandler}
                avatarClickHandler={imageUploadHandler}
              />
              <Paper
                square
                elevation={0}
                sx={{
                  pl: 2,
                  display: "flex",
                  alignItems: "center",
                  height: 50,
                  bgcolor: "background.default",
                }}
              >
                <Typography>Add your property thumbnail image</Typography>
              </Paper>
            </Box>

            {/* Step 2 - Location */}
            <Box
              sx={{
                display: activeStep === 1 ? "flex" : "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  position: "fixed",
                  height: "77%",
                  width: "50%",
                  gap: 2,
                }}
              >
                <Box sx={{ pl: "22%" }}>
                  <StyledButton
                    onClick={handleBackStep}
                    sx={{ width: "fit-content" }}
                  >
                    Back
                  </StyledButton>
                  <StyledButton submit sx={{ ml: "18%" }}>
                    Submit
                  </StyledButton>
                  <Typography variant="h6">
                    Find your property on the map (click on the map to set
                    location)
                  </Typography>
                </Box>
                <MapContainer
                  center={new LatLng(position[0], position[1])}
                  zoom={14}
                  style={{ height: "100vh", width: "100vw" }}
                >
                  <ResizeMap />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapEvents />
                  <Search country={country} area={area} step={activeStep} />
                </MapContainer>
              </Box>
            </Box>
          </Box>
          {/* Step 3 - Adding rooms */}
          <Box
            sx={{
              display: activeStep === 2 ? "flex" : "none",
              width: "100%",
            }}
          >
            <NewListingRoomsForm />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewListing;
