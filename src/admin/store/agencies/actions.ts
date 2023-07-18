import { Dispatch } from "redux";

import { axios } from "../../utils";
import {
  FETCH_AGENCIES_REQUEST,
  FETCH_AGENCIES_SUCCESS,
  FETCH_AGENCIES_FAILURE,
  ADD_AGENCIES_REQUEST,
  ADD_AGENCIES_SUCCESS,
  ADD_AGENCIES_FAILURE,
  UPDATE_AGENCIES_REQUEST,
  UPDATE_AGENCIES_SUCCESS,
  UPDATE_AGENCIES_FAILURE,
  ARCHIVE_AGENCIES_SUCCESS,
} from "./actionTypes";

export interface IAgency {
  agency_name: string;
  status: boolean;
  number_of_users: number;
  api_username: string;
  api_password: string;
  data_source: any;
}

function fetchAgenciesRequest() {
  return { type: FETCH_AGENCIES_REQUEST };
}

function fetchAgenciesSuccess(data: {
  number_of_agencies: number,
  agency: IAgency[],
}) {
  return {
    type: FETCH_AGENCIES_SUCCESS,
    payload: data,
  };
}

function fetchAgenciesFailure() {
  return {
    type: FETCH_AGENCIES_FAILURE,
  };
}

export function fetchAgencies(params: {
  keyword: string,
  page: number,
  per_page: number,
}) {
  return async (dispatch: Dispatch) => {
    dispatch(fetchAgenciesRequest());
    try {
      const resp = await axios.get('/api/v1/teams/agency/search/', { params });
      dispatch(fetchAgenciesSuccess(resp.data.data));
    } catch (err) {
      dispatch(fetchAgenciesFailure());
    }
  };
}

function addAgencyRequest() {
  return { type: ADD_AGENCIES_REQUEST };
}

function addAgencySuccess() {
  return {
    type: ADD_AGENCIES_SUCCESS,
  };
}

function addAgencyFailure() {
  return {
    type: ADD_AGENCIES_FAILURE,
  };
}

export function addAgency(data: any, onSuccess: () => void) {
  return async (dispatch: Dispatch) => {
    dispatch(addAgencyRequest());
    try {
      await axios.post('/api/v1/teams/agency/add/', data);
      dispatch(addAgencySuccess());
      onSuccess();
    } catch (err) {
      dispatch(addAgencyFailure());
    }
  };
}

function updateAgencyRequest() {
  return { type: UPDATE_AGENCIES_REQUEST };
}

function updateAgencySuccess(data: IAgency) {
  return {
    type: UPDATE_AGENCIES_SUCCESS,
    payload: data,
  };
}

function updateAgencyFailure() {
  return {
    type: UPDATE_AGENCIES_FAILURE,
  };
}

export function updateAgency(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(updateAgencyRequest());
    try {
      const resp = await axios.put('/api/v1/teams/agency/update/', data);
      dispatch(updateAgencySuccess(resp.data.data.agency));
    } catch (err) {
      dispatch(updateAgencyFailure());
    }
  };
}

function archiveAgencySuccess(id: number) {
  return {
    type: ARCHIVE_AGENCIES_SUCCESS,
    payload: id,
  };
}

export function archiveAgency(id: number) {
  return async (dispatch: Dispatch) => {
    dispatch(updateAgencyRequest());
    try {
      const resp = await axios.get(`/api/v1/teams/agency/${id}/archive/`);
      if (resp.data.result) {
        dispatch(archiveAgencySuccess(id));
      }
    } catch (err) {
      dispatch(updateAgencyFailure());
    }
  };
}

