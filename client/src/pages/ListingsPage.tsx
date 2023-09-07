import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Listings from "../components/Listings/Listings";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAccommodationsAction } from "../store/accommodationSlice";
import { ISearchParams } from "../shared/interfaces/accommodationInterfaces";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { ApiCallState } from "../shared/types/enumerations";
import { getAllAmenitiesAction } from "../store/amenitySlice";

const ListingsPage: FC = () => {
  const dispatch = useAppDispatch();
  const apiState = useAppSelector((state) => state.accommodations.apiState);
  const page = useAppSelector((state) => state.accommodations.page);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchParamsData: ISearchParams = {
      arrivalDate: searchParams.get("arrivalDate")?.toString() || "",
      departureDate: searchParams.get("departureDate")?.toString() || "",
      minPrice: searchParams.get("minPrice")?.toString() || "",
      maxPrice: searchParams.get("maxPrice")?.toString() || "",
      adults: searchParams.get("adults")?.toString() || "",
      children: searchParams.get("children")?.toString() || "",
      country: searchParams.get("country")?.toString() || "",
      area: searchParams.get("area")?.toString() || "",
      utilities: searchParams.getAll("utilities").map(String),
      page: page,
    };

    dispatch(getAccommodationsAction(searchParamsData));
    dispatch(getAllAmenitiesAction(null));
  }, [dispatch, page, searchParams]);

  if (apiState === ApiCallState.PENDING) {
    return <LoadingModal show={true} />;
  } else {
    return <Listings />;
  }
};

export default ListingsPage;
