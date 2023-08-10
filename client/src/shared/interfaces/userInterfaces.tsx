export interface IUserLogin {
  username: string;
  password: string;
}

export interface IAuth {
  token: string;
}

export interface IJwt {
  id: string;
}

export interface IExternalLogin {
  token: string | undefined;
  service: string;
  role: string;
}
