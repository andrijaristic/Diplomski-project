import { IRoom } from "./roomInterfaces";
export interface IReservationDisplay {
  id: string;
  isPayed: boolean;
  price: number;
  arrivalDate: Date;
  departureDate: Date;
  propertyName: string;
  propertyId: string;
}

export interface IReservationDetailed {
  id: string;
  isPayed: boolean;
  price: number;
  arrivalDate: string;
  departureDate: string;
  propertyName: string;
  propertyId: number;
  room: IRoom;
}

export interface INewReservation {
  userId: string;
  propertyId: string;
  roomId: string;
  price: number;
  arrivalDate: string;
  departureDate: string;
}
