import { FC } from "react";
import { Box, Divider, Grid, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledButton from "../UI/Styled/StyledButton";
import { IComment } from "../../shared/interfaces/commentInterfaces";

interface IProps {
  flag?: boolean;
  comment: IComment;
}

const Comment: FC<IProps> = ({ flag = false, comment }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/listings/${comment?.accommodationId}`);
  };

  return (
    <Grid container direction="column" sx={{ display: "flex", width: "100%" }}>
      <Grid item sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {!flag ? (
            <Typography variant="h6">{comment?.userFullName}</Typography>
          ) : (
            <Typography variant="h6">{comment?.accommodationName}</Typography>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1">{comment?.grade}</Typography>
            <Rating
              value={comment?.grade}
              precision={0.5}
              size="small"
              readOnly
            />
          </Box>
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">
          {`${new Date(comment?.creationDate).toLocaleDateString(
            "en-GB"
          )}, ${new Date(comment?.creationDate).toLocaleTimeString("en-GB")}`}
        </Typography>
      </Grid>
      <Grid item sx={{ pt: 4 }}>
        <Typography variant="h6">{comment?.header}</Typography>
        <Box sx={{ pt: 1, pb: 1, heigth: "fit-content" }}>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-wrap", textAlign: "justify" }}
          >
            {comment.content}
          </Typography>
          {flag && (
            <StyledButton onClick={handleNavigation} sx={{ mt: 2 }}>
              View property
            </StyledButton>
          )}
        </Box>
      </Grid>
      <Divider />
    </Grid>
  );
};

export default Comment;
