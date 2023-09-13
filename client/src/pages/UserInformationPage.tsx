import { FC, useEffect } from "react";
import UserInformation from "../components/UserInformation/UserInformation";
import jwtDecode from "jwt-decode";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { IJwt } from "../shared/interfaces/userInterfaces";
import { ApiCallState } from "../shared/types/enumerations";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserByIdAction } from "../store/userSlice";

const UserInformationPage: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const apiState = useAppSelector((state) => state.user.apiState);

  const { id } = jwtDecode<IJwt>(token ? token : "");

  useEffect(() => {
    dispatch(getUserByIdAction(id));
  }, [id, dispatch]);

  return (
    <>
      <UserInformation />
      <LoadingModal show={apiState === ApiCallState.PENDING} />
    </>
  );
};

export default UserInformationPage;
