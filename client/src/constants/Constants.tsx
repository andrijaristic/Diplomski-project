// APIs
export const API: string | undefined = import.meta.env.VITE_API_ENDPOINT;

export const GoogleClientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Validations
export const minPasswordLength: number = 4;

export const minUsernameLength: number = 4;

// Error messages
export const defaultErrorMessage: string = "Something went wrong";

export const defaultNoAmenitiesForListingMessage: string =
  "This listing does not provide any amenities";

// Default values
export const minPrice: number = 2;

export const maxPrice: number = 1000;

export const defaultGuests: number = 0;

export const defaultSortOption: string = "";
