import { API } from "../constants/Constants";
import { INewComment } from "../shared/interfaces/commentInterfaces";
import { axiosClient } from "./axiosClient";

export const getAccommodationComments = (acccommodationId: string) => {
  return axiosClient.get(`${API}/comments/accommodation/${acccommodationId}`);
};

export const getUserComments = (userId: string) => {
  return axiosClient.get(`${API}/comments/user/${userId}`);
};

export const createComment = (newComment: INewComment) => {
  return axiosClient.post(`${API}/comments`, newComment);
};
