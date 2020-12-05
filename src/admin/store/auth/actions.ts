import { Dispatch } from "redux";

import { axios } from "../../utils";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./actionTypes";

function loginRequest() {
  return { type: LOGIN_REQUEST };
}

function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}

function loginFailure() {
  return { type: LOGIN_FAILURE };
}

export function login(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
      const resp = await axios.post('/api/v1/login/', data);
      dispatch(loginSuccess());
      localStorage.setItem('authInfo', JSON.stringify(resp.data.data));
      window.location.href = "/";
    } catch (err) {
      dispatch(loginFailure());
    }
  };
}