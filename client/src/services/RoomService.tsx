import { API } from "../constants/Constants";
import { IRoomSearch } from "../shared/interfaces/roomInterfaces";
import { axiosClient } from "./axiosClient";

export const getFilteredRooms = async (roomSearchParams: IRoomSearch) => {
  return await axiosClient.get(`${API}/rooms`, { params: roomSearchParams });
};
