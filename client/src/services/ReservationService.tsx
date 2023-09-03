import { API } from "../constants/Constants";
import { INewReservation } from "../shared/interfaces/reservationInterface";
import { axiosClient } from "./axiosClient";

export const getUserReservations = async (id: string) => {
  return await axiosClient.get(`${API}/reservations/${id}`);
};

export const createReservation = async (newReservation: INewReservation) => {
  return await axiosClient.post(`${API}/reservations`, newReservation);
};
