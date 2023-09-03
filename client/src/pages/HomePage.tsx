import { FC, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Home from "../components/Home/Home";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserByIdAction } from "../store/userSlice";
import { IJwt } from "../shared/interfaces/userInterfaces";
import { ApiCallState } from "../shared/types/enumerations";
import { getHighestRatedAccommodationsAction } from "../store/accommodationSlice";

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const apiState = useAppSelector((state) => state.accommodations.apiState);

  useEffect(() => {
    if (token === null) {
      return;
    }

    const { id } = jwtDecode<IJwt>(token ? token : "");
    dispatch(getUserByIdAction(id));
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(getHighestRatedAccommodationsAction());
  }, [dispatch]);

  return (
    <>
      <Home />
      <LoadingModal show={apiState === ApiCallState.PENDING} />
    </>
  );
};

export default HomePage;
