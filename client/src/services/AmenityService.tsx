import { API } from "../constants/Constants";
import { axiosClient } from "./axiosClient";

export const getAllAmenities = async () => {
  return await axiosClient.get(`${API}/amenities`);
};

export const getAccommodationAmenities = async (accommodationId: string) => {
  return await axiosClient.get(
    `${API}/amenities/accommodation/${accommodationId}`
  );
};
