import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";
import { ISearchParams } from "../shared/interfaces/accommodationInterfaces";

export const getAccommodations = async (query: ISearchParams) => {
  return await axiosClient.get(`${API}/properties`, {
    params: { ...query },
  });
};

export const getAccommodationById = async (id: string) => {
  return await axiosClient.get(`${API}/properties/${id}`);
};

export const createNewAccommodation = async (newAccommodation: FormData) => {
  return await axiosClient.post(`${API}/properties`, newAccommodation);
};
