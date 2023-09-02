import { API } from "../constants/Constants";
import { axiosClient } from "./axiosClient";

export const getAccommodationComments = (acccommodationId: string) => {
  return axiosClient.get(`${API}/comments/accommodation/${acccommodationId}`);
};

export const getUserComments = (userId: string) => {
  return axiosClient.get(`${API}/comments/user/${userId}`);
};
