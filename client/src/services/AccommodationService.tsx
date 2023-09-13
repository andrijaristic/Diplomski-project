import qs from "qs";
import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";
import {
  IAccommodationBasicInformation,
  IAddAccommodationImage,
  IDeleteAccomodationImage,
  ISearchParams,
} from "../shared/interfaces/accommodationInterfaces";

export const getAccommodations = async (query: ISearchParams) => {
  return await axiosClient.get(`${API}/accommodations`, {
    params: { ...query },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getHighestRatedAccommodations = async () => {
  return await axiosClient.get(`${API}/accommodations/highest-rated`);
};

export const getAccommodationById = async (id: string) => {
  return await axiosClient.get(`${API}/accommodations/${id}`);
};

export const getUserAccommodations = async (id: string) => {
  return await axiosClient.get(`${API}/accommodations/user/${id}`);
};

export const createNewAccommodation = async (newAccommodation: FormData) => {
  return await axiosClient.post(`${API}/accommodations`, newAccommodation);
};

export const updateBasicAccommodationInformation = async (
  basicAccommodationInformation: IAccommodationBasicInformation
) => {
  return await axiosClient.put(
    `${API}/accommodations/${basicAccommodationInformation.accommodationId}`,
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
    `${API}/accommodations/${accommodationImage.accommodationId}/add-image`,
    accommodationImage.data
  );
};

export const deleteAccomodationImage = async (
  accommodationImage: IDeleteAccomodationImage
) => {
  return await axiosClient.delete(
    `${API}/accommodations/${accommodationImage.accommodationId}/delete-image`,
    {
      data: {
        imageId: accommodationImage.imageId,
        userId: accommodationImage.userId,
      },
    }
  );
};

export const deleteAccomodation = async (id: string) => {
  return await axiosClient.delete(`${API}/accommodations/${id}`);
};

export const toggleFavoriteStatus = async (id: string) => {
  return await axiosClient.put(`${API}/accommodations/${id}/toggle-favorite`);
};

export const getUserFavorites = async (userId: string) => {
  return await axiosClient.get(
    `${API}/accommodations/user/${userId}/favorites`
  );
};
