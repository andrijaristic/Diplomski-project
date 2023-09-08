import { IRoomTypeDisplay } from "./roomTypeInterfaces";
import { ISeasonalPricing } from "./seasonalPricingInterfaces";

export interface IRoom {
  id: string;
  roomType: IRoomTypeDisplay;
  reservationAmount?: number;
}

export interface IRoomSearchDisplay {
  id: string;
  arrivalDate: Date;
  departureDate: Date;
  roomType: IRoomTypeDisplay;
  price: number;
  seasonalPricings: ISeasonalPricing[];
}

export interface IRoomSearch {
  propertyId: string;
  adults: number;
  children: number;
  arrivalDate: string;
  departureDate: string;
}

export interface IRoomModal {
  roomId: string;
  arrivalDate: Date;
  departureDate: Date;
  price: number;
  seasonalPricing: ISeasonalPricing[];
}

export interface INewRoom {
  amountOfRooms: number;
  propertyId: string;
  roomTypeId: string;
}

export interface IEditRoom {
  roomId: string;
  roomTypeId: string;
  propertyId: string;
}
