import { FC } from "react";
import Login from "../components/Login/Login";
import UserForm from "../components/UI/UserForm/UserForm";

const LoginPage: FC = () => {
  return (
    <UserForm>
      <Login />
    </UserForm>
  );
};

export default LoginPage;
