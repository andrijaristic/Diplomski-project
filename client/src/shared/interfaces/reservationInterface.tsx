import { IRoom } from "./roomInterfaces";
export interface IReservationDisplay {
  id: string;
  isPayed: boolean;
  price: number;
  arrivalDate: Date;
  departureDate: Date;
  accommodationName: string;
  accommodationId: string;
}

export interface IReservationDetailed {
  id: string;
  isPayed: boolean;
  price: number;
  arrivalDate: string;
  departureDate: string;
  accommodationName: string;
  accommodationId: string;
  room: IRoom;
}

export interface INewReservation {
  userId: string;
  accommodationId: string;
  roomId: string;
  price: number;
  arrivalDate: string;
  departureDate: string;
}
