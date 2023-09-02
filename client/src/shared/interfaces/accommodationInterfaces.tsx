import { ICommentDisplay } from "./commentInterfaces";
import { IUtility } from "./utilityInterfaces";

export interface IAccommodationDisplay {
  id: string;
  name: string;
  description: string;
  averageGrade: number;
  ratingsAmount: number;
  thumbnailImage: string;
}

export interface IAccommodation {
  id: string;
  name: string;
  description: string;
  averageGrade: number;
  images: File[];
  comments: ICommentDisplay[];
  utilities: IUtility[];
}

export interface INewAccommodation {
  name: string;
  description: string;
  userId: number;
  thumbnailImage: File;
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
