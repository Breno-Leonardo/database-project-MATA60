import { AUTHORIZATION_KEY, CURRENT_VACATION_REQUEST } from "../../constants/constants";
import {
  getItemStorage,
  removeItemStorage,
  setItemStorage,
} from "./storageProxy";

export const unsetAuthorization = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorization = (token: string) => {
  if (token != "") {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorization = () => getItemStorage(AUTHORIZATION_KEY);

export const setCurrentVacationRequestID = (vacationRequestID: number) => {
  if (vacationRequestID != undefined) {
    setItemStorage(CURRENT_VACATION_REQUEST, ""+vacationRequestID+"");
  }
};

export const getCurrentVacationRequestID = () => getItemStorage(CURRENT_VACATION_REQUEST);

