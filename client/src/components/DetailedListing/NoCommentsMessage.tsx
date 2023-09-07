import { FC } from "react";
import EmptyArrayMessage from "../UI/EmptyArrayMessage/EmptyArrayMessage";

const NoCommentsMessage: FC = () => {
  return (
    <EmptyArrayMessage message="There are no comments for this accommodation" />
  );
};

export default NoCommentsMessage;
