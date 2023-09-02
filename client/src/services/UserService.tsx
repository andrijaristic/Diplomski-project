import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";
import {
  IExternalLogin,
  IPasswordChange,
  IUserLogin,
  IUserRegistration,
  IUserUpdate,
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

export const update = async (userUpdate: IUserUpdate) => {
  return await axiosClient.put(`${API}/users`, userUpdate);
};

export const passwordChange = async (
  id: string,
  passwordChange: IPasswordChange
) => {
  return await axiosClient.put(
    `${API}/users/${id}/change-password`,
    passwordChange
  );
};

export const getUserById = async (id: string) => {
  return await axiosClient.get(`${API}/users/${id}`);
};
