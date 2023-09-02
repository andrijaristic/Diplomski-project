import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";
import {
  INewAccommodation,
  ISearchParams,
} from "../shared/interfaces/accommodationInterfaces";

export const getAccommodations = async (query: ISearchParams) => {
  return await axiosClient.get(`${API}/properties`, {
    params: { ...query },
  });
};

export const createNewProperty = async (newProperty: INewAccommodation) => {
  return await axiosClient.post(`${API}/properties`, newProperty);
};
