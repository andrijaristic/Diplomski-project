import { FC, useEffect, useState } from "react";
import {
  Box,
  Divider,
  FormLabel,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import StyledButton from "../UI/Styled/StyledButton";
import { useAppDispatch } from "../../store/hooks";
import { defaultRating } from "../../constants/Constants";
import { errorNotification } from "../../utils/toastNotificationUtil";
import { INewComment } from "../../shared/interfaces/commentInterfaces";
import {
  clearAccommodationComments,
  createCommentAction,
  getAccommodationCommentsAction,
} from "../../store/commentSlice";

interface IProps {
  propertyId: string;
}

const NewCommentForm: FC<IProps> = ({ propertyId }) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number | null>(defaultRating);
  const [ratingTouched, setRatingTouched] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (!refresh) {
      return;
    }

    dispatch(clearAccommodationComments());
    dispatch(getAccommodationCommentsAction(propertyId));
  }, [dispatch, refresh, propertyId]);

  const handleRatingChange = (newValue: number | null) => {
    setRatingTouched(true);
    setRating(newValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const header = data.get("header");
    const content = data.get("content");

    if (!header || !content) {
      errorNotification("Please fill in comment fields properly");
      return;
    }

    if (!ratingTouched && rating === defaultRating) {
      errorNotification("Please give a rating");
    }

    const newComment: INewComment = {
      propertyId: propertyId,
      header: header.toString().trim(),
      content: content.toString().trim(),
      grade: rating ? rating : defaultRating,
    };

    const response = await dispatch(createCommentAction(newComment));
    if (response) {
      setRefresh(true);
    }
  };

  return (
    <>
      <Divider />
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          <Rating
            value={rating}
            onChange={(_, newValue) => handleRatingChange(newValue)}
            precision={0.5}
            size="large"
            sx={{ width: "50%" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <FormLabel sx={{ fontSize: 22 }}>Title</FormLabel>
          <TextField
            id="header"
            name="header"
            placeholder="Review title"
            sx={{ width: "60%" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <FormLabel sx={{ fontSize: 22 }}>
            Tell us about your experience
          </FormLabel>
          <TextField
            id="content"
            name="content"
            placeholder="Experience description"
            multiline
            rows={6}
            sx={{ width: "60%" }}
          />
        </Box>
        <StyledButton submit sx={{ width: "60%" }}>
          Submit your review
        </StyledButton>
        <Divider />
      </Box>
    </>
  );
};

export default NewCommentForm;
