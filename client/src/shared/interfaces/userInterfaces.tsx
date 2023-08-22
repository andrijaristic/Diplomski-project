export interface IUserLogin {
  username: string;
  password: string;
}

export interface IExternalLogin {
  token: string | undefined;
  service: string;
  role: string;
}

export interface IUserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  country: string;
  phoneNumber: string;
  role: string;
}

export interface IAuth {
  token: string;
}

export interface IJwt {
  id: string;
}
