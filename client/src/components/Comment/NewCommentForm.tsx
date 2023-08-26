import { FC } from "react";
import {
  Box,
  Divider,
  FormLabel,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import StyledButton from "../UI/Styled/StyledButton";

const NewCommentForm: FC = () => {
  return (
    <>
      <Divider />
      <Box
        sx={{
          gap: 3,
          pt: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">Leave a review</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
          }}
        >
          <FormLabel sx={{ fontSize: 22 }}>Rate your experience</FormLabel>
          <Rating precision={0.5} size="large" sx={{ width: "50%" }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <FormLabel sx={{ fontSize: 22 }}>Title</FormLabel>
          <TextField placeholder="Review title" sx={{ width: "60%" }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <FormLabel sx={{ fontSize: 22 }}>
            Tell us about your experience
          </FormLabel>
          <TextField
            placeholder="Experience description"
            multiline
            rows={6}
            sx={{ width: "60%" }}
          />
        </Box>
        <StyledButton sx={{ width: "60%" }}>Submit your review</StyledButton>
        <Divider />
      </Box>
    </>
  );
};

export default NewCommentForm;
