import {
  ISeasonalPricing,
  IUpdateSeasonalPricing,
} from "./seasonalPricingInterfaces";

export interface INewRoomType {
  id: string;
  adults: number;
  children: number;
  accommodationId: string;
  amountOfRooms: number;
  seasonalPricing: ISeasonalPricing[];
}

export interface IRoomTypeDisplay {
  id: string;
  adults: number;
  children: number;
  seasonalPricing: ISeasonalPricing[];
}

export interface IRoomTypeAddDisplay {
  id: string;
  startDate: Date;
  endDate: Date;
}

export interface IUpdateRoomType {
  roomTypeId: string;
  seasonalPrices: IUpdateSeasonalPricing[];
}
