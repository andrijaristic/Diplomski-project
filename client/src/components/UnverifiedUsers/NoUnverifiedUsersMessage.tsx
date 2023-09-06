import { FC } from "react";
import EmptyArrayMessage from "../UI/EmptyArrayMessage/EmptyArrayMessage";

const NoUnverifiedUsersMessage: FC = () => {
  return (
    <EmptyArrayMessage message="There are currently no unverified users" />
  );
};

export default NoUnverifiedUsersMessage;
