import { API } from "../constants/Constants";
import { axiosClient } from "./axiosClient";

export const getUserReservations = async (id: string) => {
  return await axiosClient.get(`${API}/reservations/${id}`);
};
