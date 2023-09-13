import { FC, useEffect } from "react";
import NewListing from "../components/NewListing/NewListing";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearAmenities, getAllAmenitiesAction } from "../store/amenitySlice";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { ApiCallState } from "../shared/types/enumerations";

const NewListingPage: FC = () => {
  const dispatch = useAppDispatch();
  const apiState = useAppSelector((state) => state.amenities.apiState);

  useEffect(() => {
    dispatch(clearAmenities());
    dispatch(getAllAmenitiesAction(null));
  }, [dispatch]);

  return (
    <>
      <NewListing />
      <LoadingModal show={apiState === ApiCallState.PENDING} />
    </>
  );
};

export default NewListingPage;
