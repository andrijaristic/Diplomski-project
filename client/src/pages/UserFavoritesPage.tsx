import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  clearAccommodations,
  getUserFavoriteAction,
} from "../store/accommodationSlice";
import jwtDecode from "jwt-decode";
import { IJwt } from "../shared/interfaces/userInterfaces";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { ApiCallState } from "../shared/types/enumerations";
import UserFavorites from "../components/UserFavorites/UserFavorites";

const UserFavoritesPage: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const apiState = useAppSelector((state) => state.accommodations.apiState);
  const { id } = jwtDecode<IJwt>(token ?? "");

  useEffect(() => {
    dispatch(clearAccommodations());
    dispatch(getUserFavoriteAction(id ?? ""));
  }, [dispatch, id]);

  return (
    <>
      <UserFavorites />
      <LoadingModal show={apiState === ApiCallState.PENDING} />
    </>
  );
};
export default UserFavoritesPage;
