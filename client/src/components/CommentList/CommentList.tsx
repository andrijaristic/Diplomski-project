import { FC } from "react";
import { Box, Typography } from "@mui/material";
import Comment from "../Comment/Comment";
import { useAppSelector } from "../../store/hooks";

const CommentList: FC = () => {
  const userComments = useAppSelector((state) => state.comments.userComments);
  const noCommentsMessage = "Oops! Seems like you haven't made any comments.";
  const content = userComments?.map((comment) => (
    <Comment flag comment={comment} />
  ));

  const comm = {
    id: "1",
    propertyId: "1",
    propertyName: "Property name",
    userFullName: "Andrija Ristic",
    grade: 4.2,
    header: "This is a title",
    content: "This is a description",
    creationDate: new Date(),
  };

  return (
    <Box
      sx={{
        pl: 2,
        display: "flex",
        flexDirection: "column",
        width: "80%",
      }}
    >
      {/* Tmp comment to verify that all data works if sent properly */}
      {/* Will be removed upon proper data creation */}
      <Comment flag comment={comm} />
      {content.length > 0 ? (
        content
      ) : (
        <Typography variant="h3" sx={{ p: 4 }}>
          {noCommentsMessage}
        </Typography>
      )}
    </Box>
  );
};

export default CommentList;
