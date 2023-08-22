import { FC } from "react";
import { useParams } from "react-router-dom";

const UserInformationPage: FC = () => {
  const { password } = useParams();
  console.log(`${password} HELLO`);
  return <h1>UserInformationPage</h1>;
};

export default UserInformationPage;
