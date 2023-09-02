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
  arrivalDate: Date;
  departureDate: Date;
  propertyName: string;
  propertyId: number;
  room: IRoom;
}
