import { API } from "../constants/Constants";
import { INewReservation } from "../shared/interfaces/reservationInterface";
import { axiosClient } from "./axiosClient";

export const getUserReservations = async (id: string) => {
  return await axiosClient.get(`${API}/reservations/${id}`);
};

export const createOnlinePaymentReservation = async (
  newReservation: INewReservation
) => {
  return await axiosClient.post(
    `${API}/reservations/online-payment`,
    newReservation
  );
};

export const createInPersonPaymentReservation = async (
  newReservation: INewReservation
) => {
  return await axiosClient.post(
    `${API}/reservations/in-person-payment`,
    newReservation
  );
};

export const cancelReservation = async (id: string) => {
  return await axiosClient.put(`${API}/reservations/cancel/${id}`);
};
