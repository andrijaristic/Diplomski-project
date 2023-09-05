import { API } from "../constants/Constants";
import { INewRoom, IRoomSearch } from "../shared/interfaces/roomInterfaces";
import { axiosClient } from "./axiosClient";

export const getFilteredRooms = async (roomSearchParams: IRoomSearch) => {
  return await axiosClient.get(`${API}/rooms`, { params: roomSearchParams });
};

export const createRoom = async (newRoom: INewRoom) => {
  return await axiosClient.post(`${API}/rooms`, newRoom);
};
