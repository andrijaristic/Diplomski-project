import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailedListing from "../components/DetailedListing/DetailedListing";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  clearDetailedAccommodations,
  getAccommodationByIdAction,
} from "../store/accommodationSlice";
import {
  clearAccommodationComments,
  getAccommodationCommentsAction,
} from "../store/commentSlice";
import { ApiCallState } from "../shared/types/enumerations";
import { clearBookingRooms } from "../store/roomSlice";
import {
  clearRoomTypes,
  getRoomTypesForAccommodationAction,
} from "../store/roomTypeSlice";

const DetailedListingPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const apiState = useAppSelector((state) => state.accommodations.apiState);

  useEffect(() => {
    window.scrollTo(0, 0); // Force scroll to top of page
    dispatch(clearBookingRooms());
  }, [dispatch]);

  useEffect(() => {
    if (apiState !== ApiCallState.REJECTED) {
      return;
    }

    navigate("/listings");
  }, [apiState, navigate]);

  useEffect(() => {
    dispatch(clearRoomTypes());
    dispatch(clearDetailedAccommodations());
    dispatch(clearAccommodationComments());
    dispatch(getAccommodationByIdAction(id ? id : ""));
    dispatch(getAccommodationCommentsAction(id ? id : ""));
    dispatch(getRoomTypesForAccommodationAction(id ? id : ""));
  }, [id, dispatch]);

  return (
    <>
      <DetailedListing />
      <LoadingModal show={apiState === ApiCallState.PENDING} />
    </>
  );
};

export default DetailedListingPage;
