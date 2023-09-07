import { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import Comment from "../Comment/Comment";
import CommentSkeleton from "../Comment/CommentSkeleton";
import { ApiCallState } from "../../shared/types/enumerations";
import NoCommentsMessage from "./NoCommentsMessage";

const DetailedListingComments: FC = () => {
  const apiState = useAppSelector((state) => state.comments.apiState);
  const accommodationComments = useAppSelector(
    (state) => state.comments.accommodationComments
  );

  const content = accommodationComments?.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));

  if (apiState === ApiCallState.PENDING) {
    return <CommentSkeleton />;
  } else {
    return content.length > 0 ? content : <NoCommentsMessage />;
  }
};

export default DetailedListingComments;
