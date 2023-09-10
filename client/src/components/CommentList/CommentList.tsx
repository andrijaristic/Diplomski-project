import { FC } from "react";
import { Box, Typography } from "@mui/material";
import Comment from "../Comment/Comment";
import { useAppSelector } from "../../store/hooks";
import EmptyArrayMessage from "../UI/EmptyArrayMessage/EmptyArrayMessage";

const CommentList: FC = () => {
  const userComments = useAppSelector((state) => state.comments.userComments);
  const noCommentsMessage = (
    <EmptyArrayMessage message="Oops! Seems like you haven't made any comments." />
  );
  const content = userComments?.map((comment) => (
    <Comment flag comment={comment} />
  ));

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {content.length > 0 ? content : noCommentsMessage}
    </Box>
  );
};

export default CommentList;
