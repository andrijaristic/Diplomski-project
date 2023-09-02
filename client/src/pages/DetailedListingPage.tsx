import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailedListing from "../components/DetailedListing/DetailedListing";
import { useAppDispatch } from "../store/hooks";
import { getAccommodationByIdAction } from "../store/accommodationSlice";

const DetailedListingPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      getAccommodationByIdAction("d3ba14f5-0715-432f-84a2-f1ea7bbb953d")
    );
  }, [dispatch]);

  return <DetailedListing />;
};

export default DetailedListingPage;
