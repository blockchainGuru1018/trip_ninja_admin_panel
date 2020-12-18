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
  FETCH_BASIC_INFO_REQUEST,
  FETCH_BASIC_INFO_SUCCESS,
  FETCH_BASIC_INFO_FAILURE,
  UPDATE_BASIC_INFO_REQUEST,
  UPDATE_BASIC_INFO_SUCCESS,
  UPDATE_BASIC_INFO_FAILURE,
  FETCH_GENERAL_INFO_REQUEST,
  FETCH_GENERAL_INFO_SUCCESS,
  FETCH_GENERAL_INFO_FAILURE,
  UPDATE_GENERAL_INFO_REQUEST,
  UPDATE_GENERAL_INFO_SUCCESS,
  UPDATE_GENERAL_INFO_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
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

export function addUser(data: any, onSuccess: () => void) {
  return async (dispatch: Dispatch) => {
    dispatch(addUserRequest());
    try {
      await axios.post('/api/v1/users/single-add/', data);
      dispatch(addUserSuccess());
      onSuccess();
    } catch (err) {
      dispatch(addUserFailure());
    }
  };
}

export function addBulkUsers(data: any, onSuccess: () => void) {
  return async (dispatch: Dispatch) => {
    dispatch(addUserRequest());
    try {
      await axios.post('/api/v1/users/bulk-add/', data);
      dispatch(addUserSuccess());
      onSuccess();
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

function fetchBasicInfoRequest() {
  return { type: FETCH_BASIC_INFO_REQUEST };
}

function fetchBasicInfoSuccess(data: {
  user_info: any,
}) {
  return {
    type: FETCH_BASIC_INFO_SUCCESS,
    payload: data,
  };
}

function fetchBasicInfoFailure() {
  return {
    type: FETCH_BASIC_INFO_FAILURE,
  };
}

export function fetchBasicInfo() {
  return async (dispatch: Dispatch) => {
    dispatch(fetchBasicInfoRequest());
    try {
      const resp = await axios.get('/api/v1/users/basic/');
      dispatch(fetchBasicInfoSuccess(resp.data.data));
    } catch (err) {
      dispatch(fetchBasicInfoFailure());
    }
  };
}

function updateBasicInfoRequest() {
  return { type: UPDATE_BASIC_INFO_REQUEST };
}

function updateBasicInfoSuccess(data: {
  user_info: any,
}) {
  return {
    type: UPDATE_BASIC_INFO_SUCCESS,
    payload: data,
  };
}

function updateBasicInfoFailure() {
  return {
    type: UPDATE_BASIC_INFO_FAILURE,
  };
}

export function updateBasicInfo(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(updateBasicInfoRequest());
    try {
      const resp = await axios.put('/api/v1/users/basic/', data);
      dispatch(updateBasicInfoSuccess(resp.data.data));
    } catch (err) {
      dispatch(updateBasicInfoFailure());
    }
  };
}

function fetchGeneralInfoRequest() {
  return { type: FETCH_GENERAL_INFO_REQUEST };
}

function fetchGeneralInfoSuccess(data: {
  user_info: any,
}) {
  return {
    type: FETCH_GENERAL_INFO_SUCCESS,
    payload: data,
  };
}

function fetchGeneralInfoFailure() {
  return {
    type: FETCH_GENERAL_INFO_FAILURE,
  };
}

export function fetchGeneralInfo() {
  return async (dispatch: Dispatch) => {
    dispatch(fetchGeneralInfoRequest());
    try {
      const resp = await axios.get('/api/v1/users/general/');
      dispatch(fetchGeneralInfoSuccess(resp.data.data));
    } catch (err) {
      dispatch(fetchGeneralInfoFailure());
    }
  };
}

function updateGeneralInfoRequest() {
  return { type: UPDATE_GENERAL_INFO_REQUEST };
}

function updateGeneralInfoSuccess(data: {
  user_info: any,
}) {
  return {
    type: UPDATE_GENERAL_INFO_SUCCESS,
    payload: data,
  };
}

function updateGeneralInfoFailure() {
  return {
    type: UPDATE_GENERAL_INFO_FAILURE,
  };
}

export function updateGeneralInfo(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(updateGeneralInfoRequest());
    try {
      const resp = await axios.put('/api/v1/users/general/', data);
      dispatch(updateGeneralInfoSuccess(resp.data.data));
    } catch (err) {
      dispatch(updateGeneralInfoFailure());
    }
  };
}


function changePasswordRequest() {
  return { type: CHANGE_PASSWORD_REQUEST };
}

function changePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
}

function changePasswordFailure() {
  return {
    type: CHANGE_PASSWORD_FAILURE,
  };
}

export function changePassword(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(changePasswordRequest());
    try {
      await axios.post('/api/v1/change-password/', data);
      dispatch(changePasswordSuccess());
    } catch (err) {
      dispatch(changePasswordFailure());
    }
  };
}