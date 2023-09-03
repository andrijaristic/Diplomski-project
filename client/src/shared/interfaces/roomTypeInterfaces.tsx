import { ISeasonalPricing } from "./seasonalPricingInterfaces";

export interface INewRoomType {
  id: string;
  adults: number;
  children: number;
  propertyId: string;
  amountOfRooms: number;
  seasonalPricings: ISeasonalPricing[];
}
