import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";
import { INewRoom, IRoomSearch } from "../shared/interfaces/roomInterfaces";

export const getFilteredRooms = async (roomSearchParams: IRoomSearch) => {
  return await axiosClient.get(`${API}/rooms`, { params: roomSearchParams });
};

export const createRoom = async (newRoom: INewRoom) => {
  return await axiosClient.post(`${API}/rooms`, newRoom);
};

export const getAccommodationRooms = async (accommodationId: string) => {
  return await axiosClient.get(`${API}/rooms/accommodation/${accommodationId}`);
};
