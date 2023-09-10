import qs from "qs";
import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";
import {
  IAccommodationBasicInformation,
  IAddAccommodationImage,
  ISearchParams,
} from "../shared/interfaces/accommodationInterfaces";

export const getAccommodations = async (query: ISearchParams) => {
  return await axiosClient.get(`${API}/properties`, {
    params: { ...query },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getHighestRatedAccommodations = async () => {
  return await axiosClient.get(`${API}/properties/highest-rated`);
};

export const getAccommodationById = async (id: string) => {
  return await axiosClient.get(`${API}/properties/${id}`);
};

export const getUserAccommodations = async (id: string) => {
  return await axiosClient.get(`${API}/properties/user/${id}`);
};

export const createNewAccommodation = async (newAccommodation: FormData) => {
  return await axiosClient.post(`${API}/properties`, newAccommodation);
};

export const updateBasicAccommodationInformation = async (
  basicAccommodationInformation: IAccommodationBasicInformation
) => {
  return await axiosClient.put(
    `${API}/properties/${basicAccommodationInformation.propertyId}`,
    {
      name: basicAccommodationInformation.name,
      description: basicAccommodationInformation.description,
      userId: basicAccommodationInformation.userId,
    }
  );
};

export const addAccommodationImage = async (
  accommodationImage: IAddAccommodationImage
) => {
  return await axiosClient.post(
    `${API}/properties/${accommodationImage.propertyId}/add-image`,
    accommodationImage.data
  );
};

export const toggleFavoriteStatus = async (id: string) => {
  return await axiosClient.put(`${API}/properties/${id}/toggle-favorite`);
};
