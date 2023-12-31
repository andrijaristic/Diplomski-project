export interface IUserLogin {
  username: string;
  password: string;
}

export interface IDisplayUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  role: string;
  verificationStatus: string;
  isVerified: boolean;
}

export interface IUnverifiedUser {
  firstName: string;
  lastName: string;
  email: string;
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

export interface IUserUpdate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
}

export interface IPasswordChange {
  currentPassword: string;
  newPassword: string;
}

export interface IPasswordChangeData {
  id: string;
  body: IPasswordChange;
}

export interface IAuth {
  token: string;
}

export interface IJwt {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IUserVerification {
  id: string;
  isAccepted: boolean;
}
