import { FC, useEffect } from "react";
import UnverifiedUsers from "../components/UnverifiedUsers/UnverifiedUsers";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  clearUnverifiedUsers,
  getUnverifiedUsersAction,
} from "../store/userSlice";
import { ApiCallState } from "../shared/types/enumerations";

const UnverifiedUsersPage: FC = () => {
  const dispatch = useAppDispatch();
  const apiState = useAppSelector((state) => state.user.apiState);

  useEffect(() => {
    dispatch(clearUnverifiedUsers());
    dispatch(getUnverifiedUsersAction(""));
  }, [dispatch]);

  return (
    <>
      <UnverifiedUsers />
      <LoadingModal show={apiState === ApiCallState.PENDING} />
    </>
  );
};

export default UnverifiedUsersPage;
