import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";
import {
  IExternalLogin,
  IUserLogin,
  IUserRegistration,
} from "../shared/interfaces/userInterfaces";

export const login = async (userLogin: IUserLogin) => {
  return await axiosClient.post(`${API}/users/login`, userLogin);
};

export const externalLogin = async (externalLogin: IExternalLogin) => {
  return await axiosClient.post(`${API}/users/external-login`, externalLogin);
};

export const register = async (userRegister: IUserRegistration) => {
  return await axiosClient.post(`${API}/users/register`, userRegister);
};
