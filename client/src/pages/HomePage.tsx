import { FC, useEffect } from "react";
import Home from "../components/Home/Home";
import jwtDecode from "jwt-decode";
import { IJwt } from "../shared/interfaces/userInterfaces";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserByIdAction } from "../store/userSlice";

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);

  useEffect(() => {
    if (token === null) {
      return;
    }

    const { id } = jwtDecode<IJwt>(token ? token : "");
    dispatch(getUserByIdAction(id));
  }, [token, dispatch]);

  return <Home />;
};

export default HomePage;
