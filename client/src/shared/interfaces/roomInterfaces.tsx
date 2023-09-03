import { IRoomTypeDisplay } from "./roomTypeInterfaces";

export interface IRoom {
  id: string;
  roomType: IRoomTypeDisplay;
}

export interface IRoomSearchDisplay {
  id: string;
  arrivalDate: Date;
  departureDate: Date;
  roomType: IRoomTypeDisplay;
  price: number;
}

export interface IRoomSearch {
  propertyId: string;
  adults: number;
  children: number;
  arrivalDate: string;
  departureDate: string;
}
