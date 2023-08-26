import { FC } from "react";
import { Box } from "@mui/material";
import Comment from "../Comment/Comment";

const DUMMY_PROPERTY_NAME = "Template property name";

const CommentList: FC = () => {
  return (
    <Box
      sx={{
        pl: 2,
        display: "flex",
        flexDirection: "column",
        width: "80%",
      }}
    >
      <Comment flag propertyName={DUMMY_PROPERTY_NAME} />
      <Comment flag propertyName={DUMMY_PROPERTY_NAME} />
      <Comment flag propertyName={DUMMY_PROPERTY_NAME} />
      <Comment flag propertyName={DUMMY_PROPERTY_NAME} />
    </Box>
  );
};

export default CommentList;
