import { IAccommodationImage } from "./accommodationImageInterfaces";
import { IComment } from "./commentInterfaces";
import { IRoomTypeDisplay } from "./roomTypeInterfaces";
import { IUtility } from "./utilityInterfaces";

export interface IAccommodationDisplay {
  id: string;
  name: string;
  description: string;
  averageGrade: number;
  ratingsAmount: number;
  thumbnailImage: IAccommodationImage;
}

export interface IAccommodationMinimal {
  id: string;
  name: string;
  description: string;
  thumbnailImage: IAccommodationImage;
}
export interface IAccommodation {
  id: string;
  name: string;
  description: string;
  averageGrade: number;
  thumbnailImage: IAccommodationImage;
  images: IAccommodationImage[];
  comments: IComment[];
  utilities: IUtility[];
  roomTypes: IRoomTypeDisplay[];
}

export interface INewAccommodation {
  name: string;
  description: string;
  country: string;
  area: string;
  userId: string;
  latitude: number;
  longitude: number;
  thumbnailImage: File;
}

export interface IAccommodationBasicInformation {
  propertyId: string;
  userId: string;
  name: string;
  description: string;
}

export interface IAddAccommodationImage {
  propertyId: string;
  data: FormData;
}

export interface ISearchParams {
  arrivalDate?: string;
  departureDate?: string;
  adults?: string;
  children?: string;
  minPrice?: string;
  maxPrice?: string;
  utilities?: number[];
  page: number;
}
