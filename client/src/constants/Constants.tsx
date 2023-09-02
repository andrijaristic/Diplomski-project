// APIs
export const API: string | undefined = import.meta.env.VITE_API_ENDPOINT;

export const GoogleClientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Validations
export const emailRegex: RegExp = /^([\w.-]+)@([\w-]+)((\.(\w){2,})+)$/i;

export const minPasswordLength: number = 4;

export const minUsernameLength: number = 4;

export const minTextInputLength: number = 4;

export const minCountryNameLength: number = 4;

// export const phoneNumberRegex: RegExp =
//   /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
export const phoneNumberRegex: RegExp =
  /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;

// Error messages
export const defaultErrorMessage: string = "Something went wrong";

export const defaultNoAmenitiesForListingMessage: string =
  "This listing does not provide any amenities";

export const defaultFormErrorMessage: string = "Please fill in all fields";

export const defaultCoordinateErrorMessage: string =
  "Please pick a location on the map";

// Default values
export const minPrice: number = 2;

export const maxPrice: number = 1000;

export const defaultGuests: number = 0;

export const defaultSortOption: string = "";

export const defaultLat = 51.505;

export const defaultLng = -0.09;
