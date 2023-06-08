import axios, { AxiosRequestConfig } from "axios";
import {
  ERROR_ACCESS_DANIED,
  ERROR_CONNECTION,
} from "../../constants/constants";
import { MethodsEnum } from "../../enums/methods.enum";
import { getAuthorization } from "./auth";

export default class ConnectionAPI {
  static async call<T>(url: string, method: string, body?: any): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: getAuthorization(),
        'Content-Type': 'application/json',
      },
    };

    if (method == MethodsEnum.GET) {
      return (await axios.get<T>(url,config)).data;
    } else if (method == MethodsEnum.DELETE) {
      return (await axios.delete<T>(url,config)).data;
    } else if (method == MethodsEnum.POST) {
      return (await axios.post<T>(url, body,config)).data;
    } else if (method == MethodsEnum.PUT) {
      return (await axios.put<T>(url, body,config)).data;
    } else method == MethodsEnum.PATCH;
    return (await axios.patch<T>(url, body,config)).data;
  }
  static async connect<T>(url: string, method: string, body?: any): Promise<T> {
    return ConnectionAPI.call<T>(url, method, body).catch((err) => {
      if (err.response) {
        if (err.response.status == 401 || err.response.status == 403)
          throw new Error(ERROR_ACCESS_DANIED);
        else throw new Error(ERROR_CONNECTION);
      } else throw new Error(ERROR_CONNECTION);
    });
  }
}

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.GET);
};

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.DELETE);
};

export const connectionAPIPost = async <T>(
  url: string,
  body: any
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.POST, body);
};

export const connectionAPIPut = async <T>(
  url: string,
  body: any
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.PUT, body);
};

export const connectionAPIPatch = async <T>(
  url: string,
  body: any
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.PATCH, body);
};
