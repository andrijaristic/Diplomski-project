import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailedListing from "../components/DetailedListing/DetailedListing";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAccommodationByIdAction } from "../store/accommodationSlice";
import { getAccommodationCommentsAction } from "../store/commentSlice";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { ApiCallState } from "../shared/types/enumerations";
import { clearBookingRooms } from "../store/roomSlice";
const DetailedListingPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const accommodationApiState = useAppSelector(
    (state) => state.accommodations.apiState
  );
  const commentApiState = useAppSelector((state) => state.comments.apiState);

  useEffect(() => {
    window.scrollTo(0, 0); // Force scroll to top of page
    dispatch(clearBookingRooms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccommodationByIdAction(id ? id : ""));
    dispatch(getAccommodationCommentsAction(id ? id : ""));
  }, [id, dispatch]);

  return (
    <>
      <DetailedListing />
      <LoadingModal
        show={
          accommodationApiState === ApiCallState.PENDING ||
          commentApiState === ApiCallState.PENDING
        }
      />
    </>
  );
};

export default DetailedListingPage;
