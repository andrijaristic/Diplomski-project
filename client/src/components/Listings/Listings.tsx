import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLng } from "leaflet-geosearch/dist/providers/provider.js";
import {
  Box,
  Divider,
  Fade,
  Grid,
  Pagination,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ListingsItem from "./ListingsItem";
import ListingActions from "./ListingActions";
import "leaflet/dist/leaflet.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearAccommodations,
  getAccommodationsAction,
} from "../../store/accommodationSlice";
import { ISearchParams } from "../../shared/interfaces/accommodationInterfaces";

const getSearchParams = (searchParams: URLSearchParams) => {
  return {
    arrivalDate: searchParams.get("arrivalDate")?.toString() || "",
    departureDate: searchParams.get("departureDate")?.toString() || "",
    minPrice: searchParams.get("minPrice")?.toString() || "",
    maxPrice: searchParams.get("maxPrice")?.toString() || "",
    adults: searchParams.get("adults")?.toString() || "",
    children: searchParams.get("children")?.toString() || "",
    country: searchParams.get("country")?.toString() || "",
    area: searchParams.get("area")?.toString() || "",
    utilities: searchParams.getAll("utilities")?.map(String) || [],
  };
};

const Listings: FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.accommodations.page);
  const totalPages = useAppSelector((state) => state.accommodations.totalPages);
  const accommodations = useAppSelector(
    (state) => state.accommodations.accommodations
  );

  const [mapCenter, setMapCenter] = useState<LatLng>({
    lat: 43.61928703546727,
    lng: 20.997136831283573,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState<string>(
    searchParams?.get("sort") ? searchParams?.get("sort") : "HighestPrice"
  );

  const handleSortingChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value);

    const searchParamsData: ISearchParams = {
      ...getSearchParams(searchParams),
      sort: event.target.value,
      page: page,
    };

    setSearchParams(searchParamsData as unknown as URLSearchParams);
    dispatch(clearAccommodations());
    dispatch(getAccommodationsAction(searchParamsData));
  };

  const handleMapCenter = (lat: number, lng: number) => {
    setMapCenter({ lat: lat, lng: lng });
  };

  const ChangeView = ({ center }: { center: LatLng }) => {
    const map = useMap();
    map.setView(center, 16);
    return null;
  };

  const content: JSX.Element[] = accommodations?.map((accommodation) => (
    <ListingsItem
      key={accommodation.id}
      accommodation={accommodation}
      onClick={handleMapCenter}
    />
  ));

  const markers = accommodations?.map((accommodation) => {
    return (
      <Marker
        key={accommodation?.id}
        position={[accommodation?.latitude, accommodation?.longitude]}
      >
        <Popup>{accommodation?.name}</Popup>
      </Marker>
    );
  });

  const handlePageChange = (_: unknown, value: number) => {
    const searchParamsData: ISearchParams = {
      ...getSearchParams(searchParams),
      sort: sortOption,
      page: value,
    };

    setSearchParams(searchParamsData as unknown as URLSearchParams);
    dispatch(getAccommodationsAction(searchParamsData));
  };

  return (
    <Fade in>
      <Grid container sx={{ pb: 4 }}>
        <Grid item xs={12} md={9}>
          <Grid container direction="column" sx={{ pt: 8, pl: 3 }}>
            <Grid item>
              <Typography variant="h2" component="h1">
                Find your accommodation
              </Typography>
              <Divider sx={{ width: "98%", pt: 1 }} />
            </Grid>
            <Grid
              item
              sx={{
                pt: 2,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ListingActions
                sort={sortOption}
                onChange={handleSortingChange}
              />
            </Grid>
            <Grid
              item
              sx={{
                pt: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                count={totalPages} // Max pages
                page={page}
                shape="rounded"
                variant="outlined"
                size="large"
                color="secondary"
                onChange={handlePageChange}
              />
            </Grid>
            <Grid
              item
              sx={{
                pt: 2,
                pr: 2,
                gap: 2,
                display: "flex",
                flexWrap: "wrap",
                flexGrow: 1,
                flexShrink: 1,
              }}
            >
              {content.length > 0 ? (
                content
              ) : (
                <Typography variant="h5">
                  There are no listings with the provided filter parameters. Try
                  something else!
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} md={3}>
          <Box sx={{ position: "fixed", height: "100%", width: "25%" }}>
            <MapContainer
              id="map"
              center={mapCenter}
              zoom={16}
              style={{ height: "100vh", width: "100wh" }}
            >
              <ChangeView center={mapCenter} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markers.length > 0 && markers}
            </MapContainer>
          </Box>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default Listings;
