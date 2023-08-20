import { FC } from "react";
import { useParams } from "react-router-dom";
import DetailedListing from "../components/DetailedListing/DetailedListing";

const DetailedListingPage: FC = () => {
  const { id } = useParams();
  return <DetailedListing />;
};

export default DetailedListingPage;
