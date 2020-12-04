import { Dispatch } from "redux";

import { axios } from "../../utils";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "./actionTypes";

export interface IUser {
  name: string;
  team?: string;
  status: boolean;
  role: string;
  last_login?: string;
}

function fetchUsersRequest() {
  return { type: FETCH_USERS_REQUEST };
}

function fetchUsersSuccess(data: {
  number_of_users: number,
  users: IUser[],
}) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: data,
  };
}

function fetchUsersFailure() {
  return {
    type: FETCH_USERS_FAILURE,
  };
}

export function fetchUsers(params: {
  keyword: string,
  page: number,
  per_page: number,
}) {
  return async (dispatch: Dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const resp = await axios.get('/api/v1/users/search/', { params });
      dispatch(fetchUsersSuccess(resp.data.data));
    } catch (err) {
      dispatch(fetchUsersFailure());
    }
  };
}

function addUserRequest() {
  return { type: ADD_USER_REQUEST };
}

function addUserSuccess() {
  return {
    type: ADD_USER_SUCCESS,
  };
}

function addUserFailure() {
  return {
    type: ADD_USER_FAILURE,
  };
}

export function addUser(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(addUserRequest());
    try {
      await axios.post('/api/v1/users/single-add/', data);
      dispatch(addUserSuccess());
    } catch (err) {
      dispatch(addUserFailure());
    }
  };
}

export function addBulkUsers(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(addUserRequest());
    try {
      await axios.post('/api/v1/users/bulk-add/', data);
      dispatch(addUserSuccess());
    } catch (err) {
      dispatch(addUserFailure());
    }
  };
}
