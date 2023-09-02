import { ISeasonalPricing } from "./seasonalPricingInterfaces";

export interface IRoomType {
  id: string;
  adults: number;
  children: number;
  seasonalPricings: ISeasonalPricing[];
}
