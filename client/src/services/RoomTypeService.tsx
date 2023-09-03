import { API } from "../constants/Constants";
import { INewRoomType } from "../shared/interfaces/roomTypeInterfaces";
import { axiosClient } from "./axiosClient";

export const createNewRoomType = async (newRoomType: INewRoomType) => {
  return await axiosClient.post(`${API}/roomTypes`, newRoomType);
};
