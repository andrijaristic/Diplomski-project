import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";
import {
  IExternalLogin,
  IUserLogin,
} from "../shared/interfaces/userInterfaces";

export const login = async (userLogin: IUserLogin) => {
  return await axiosClient.post(`${API}/users/login`, userLogin);
};

export const externalLogin = async (externalLogin: IExternalLogin) => {
  return await axiosClient.post(`${API}/users/external-login`, externalLogin);
};
