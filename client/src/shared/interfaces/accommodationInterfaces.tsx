import { IAccommodationImage } from "./accommodationImageInterfaces";
import { IComment } from "./commentInterfaces";
import { IRoomTypeDisplay } from "./roomTypeInterfaces";
import { IAmenity } from "./amenityInterfaces";

export interface IAccommodationDisplay {
  id: string;
  name: string;
  description: string;
  averageGrade: number;
  comments: number;
  latitude: number;
  longitude: number;
  country?: string;
  area?: string;
  isSaved: boolean;
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
  utilities: IAmenity[];
  roomTypes: IRoomTypeDisplay[];
  startingPrice: number;
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
  country?: string;
  area?: string;
  utilities?: string[];
  sort?: string;
  page: number;
}
