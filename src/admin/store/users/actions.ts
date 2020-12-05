import { Dispatch } from "redux";

import { axios } from "../../utils";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  ARCHIVE_USER_SUCCESS,
} from "./actionTypes";

export interface IUser {
  user_id: number;
  username: string;
  email: string;
  team_id?: string;
  team_name?: string;
  phone_number?: string;
  is_active: boolean;
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

function updateUserRequest() {
  return { type: UPDATE_USER_REQUEST };
}

function updateUserSuccess(data: IUser) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: data,
  };
}

function updateUserFailure() {
  return {
    type: UPDATE_USER_FAILURE,
  };
}

export function updateUser(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(updateUserRequest());
    try {
      const resp = await axios.put('/api/v1/users/update/', data);
      dispatch(updateUserSuccess(resp.data.data.user));
    } catch (err) {
      dispatch(updateUserFailure());
    }
  };
}

function archiveUserSuccess(id: number) {
  return {
    type: ARCHIVE_USER_SUCCESS,
    payload: id,
  };
}

export function archiveUser(id: number) {
  return async (dispatch: Dispatch) => {
    dispatch(updateUserRequest());
    try {
      const resp = await axios.get(`/api/v1/users/${id}/archive/`);
      if (resp.data.result) {
        dispatch(archiveUserSuccess(id));
      }
    } catch (err) {
      dispatch(updateUserFailure());
    }
  };
}