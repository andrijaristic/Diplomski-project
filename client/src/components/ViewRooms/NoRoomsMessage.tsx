import { FC } from "react";
import EmptyArrayMessage from "../UI/EmptyArrayMessage/EmptyArrayMessage";

const NoRoomsMessage: FC = () => {
  return <EmptyArrayMessage message="This accommodation has no rooms" />;
};

export default NoRoomsMessage;
