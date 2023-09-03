import { FC, useEffect } from "react";
import EditListing from "../components/EditListing/EditListing";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { ApiCallState } from "../shared/types/enumerations";
import { useParams } from "react-router-dom";
import { getAccommodationByIdAction } from "../store/accommodationSlice";

const EditListingPage: FC = () => {
  const dispatch = useAppDispatch();
  const apiState = useAppSelector((state) => state.accommodations.apiState);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAccommodationByIdAction(id ? id : ""));
  }, [id, dispatch]);
  return (
    <>
      <EditListing />
      <LoadingModal show={apiState === ApiCallState.PENDING} />
    </>
  );
};

export default EditListingPage;
