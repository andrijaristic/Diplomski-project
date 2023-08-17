import { FC } from "react";
import { useParams } from "react-router-dom";
import DetailedListing from "../components/DetailedListing/DetailedListing";

const DetailedListingPage: FC = () => {
  const { id } = useParams();

  console.log(id);
  return <DetailedListing />;
};

export default DetailedListingPage;
