import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";
import {
  INewRoom,
  IRoomSearch,
  IEditRoom,
  IDeleteRoom,
} from "../shared/interfaces/roomInterfaces";

export const getFilteredRooms = async (roomSearchParams: IRoomSearch) => {
  return await axiosClient.get(`${API}/rooms`, { params: roomSearchParams });
};

export const createRoom = async (newRoom: INewRoom) => {
  return await axiosClient.post(`${API}/rooms`, newRoom);
};

export const getAccommodationRooms = async (accommodationId: string) => {
  return await axiosClient.get(`${API}/rooms/accommodation/${accommodationId}`);
};

export const updateRoom = async (updateRoom: IEditRoom) => {
  return await axiosClient.put(`${API}/rooms/${updateRoom.roomId}`, {
    propertyId: updateRoom.propertyId,
    roomTypeId: updateRoom.roomTypeId,
  });
};

export const deleteRoom = async (deleteRoom: IDeleteRoom) => {
  return await axiosClient.delete(`${API}/rooms/${deleteRoom.roomId}`, {
    data: {
      propertyId: deleteRoom.propertyId,
    },
  });
};
