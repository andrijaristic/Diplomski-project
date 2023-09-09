import { FC, useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { IAccommodationImage } from "../../shared/interfaces/accommodationImageInterfaces";

interface IProps {
  edit: boolean;
  images: IAccommodationImage[];
  onDelete?: (id: string) => void;
}

const ImageDisplay: FC<IProps> = ({ edit = false, images, onDelete }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(images[activeStep]?.id);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: "auto",
        flexGrow: 1,
        pt: 2,
      }}
    >
      {edit && (
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography>Property showcase</Typography>
          <Button sx={{ ml: "auto" }} onClick={handleDelete}>
            Delete this image?
          </Button>
        </Paper>
      )}
      <Box
        component="img"
        src={images[activeStep]?.imageURL}
        alt="thumbnail-image"
        sx={{
          width: "100%",
          aspectRatio: "2 / 1",
        }}
      />
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            variant="outlined"
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{
              ":hover": {
                bgcolor: "secondary.main",
                color: "white",
              },
            }}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{
              ":hover": {
                bgcolor: "secondary.main",
                color: "white",
              },
            }}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default ImageDisplay;
