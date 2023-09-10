export interface ISeasonalPricing {
  id: string;
  startDate: Date;
  endDate: Date;
  price: number;
}

export interface IUpdateSeasonalPricing {
  id: string;
  price: string;
}
