import { FC, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Account from "../components/Account/Account";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserByIdAction } from "../store/userSlice";
import { ApiCallState } from "../shared/types/enumerations";
import { IJwt } from "../shared/interfaces/userInterfaces";

const AccountPage: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const apiState = useAppSelector((state) => state.user.apiState);

  const { id } = jwtDecode<IJwt>(token ? token : "");

  useEffect(() => {
    dispatch(getUserByIdAction(id));
  }, [id, dispatch]);

  return (
    <>
      <Account />
      <LoadingModal show={apiState === ApiCallState.PENDING} />
    </>
  );
};

export default AccountPage;
