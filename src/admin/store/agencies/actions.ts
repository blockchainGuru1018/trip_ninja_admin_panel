import { Dispatch } from "redux";

import { axios } from "../../utils";
import {
  FETCH_AGENCIES_REQUEST,
  FETCH_AGENCIES_SUCCESS,
  FETCH_AGENCIES_FAILURE,
} from "./actionTypes";

export interface IAgency {
  agency_name: string;
  status: boolean;
  number_of_users: number;
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
