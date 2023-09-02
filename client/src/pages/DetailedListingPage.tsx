import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailedListing from "../components/DetailedListing/DetailedListing";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAccommodationByIdAction } from "../store/accommodationSlice";
import { getAccommodationCommentsAction } from "../store/commentSlice";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { ApiCallState } from "../shared/types/enumerations";

const DetailedListingPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const accommodationApiState = useAppSelector(
    (state) => state.accommodations.apiState
  );
  const commentApiState = useAppSelector((state) => state.comments.apiState);
  const accId = "d3ba14f5-0715-432f-84a2-f1ea7bbb953d";

  useEffect(() => {
    dispatch(getAccommodationByIdAction(accId));
    dispatch(getAccommodationCommentsAction(accId));
    console.log("re-render");
  }, [dispatch]);

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
