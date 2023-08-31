import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";
import { INewProperty } from "../shared/interfaces/propertyInterfaces";

export const createNewProperty = async (newProperty: INewProperty) => {
  return await axiosClient.post(`${API}/properties`, newProperty);
};
