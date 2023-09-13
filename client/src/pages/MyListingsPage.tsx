import { FC, useEffect } from "react";
import MyListings from "../components/MyListings/MyListings";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import jwtDecode from "jwt-decode";
import { IJwt } from "../shared/interfaces/userInterfaces";
import { getUserAccommodationsAction } from "../store/accommodationSlice";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { ApiCallState } from "../shared/types/enumerations";

const MyListingsPage: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const apiState = useAppSelector((state) => state.accommodations.apiState);

  const { id } = jwtDecode<IJwt>(token ?? "");

  useEffect(() => {
    dispatch(getUserAccommodationsAction(id));
  }, [id, dispatch]);

  return (
    <>
      <MyListings />
      <LoadingModal show={apiState === ApiCallState.PENDING} />
    </>
  );
};

export default MyListingsPage;
