import { Dispatch } from "redux";

import { axios } from "../../config";
import {
  FETCH_AGENCY_REQUEST,
  FETCH_AGENCY_SUCCESS,
  FETCH_AGENCY_FAILURE,
} from "./actionTypes";

export interface ITeam {
  agency_name: string;
  status: boolean;
  number_of_users: number;
}

function fetchAgencyRequest() {
  return { type: FETCH_AGENCY_REQUEST };
}

function fetchAgencySuccess(data: {
  number_of_agencies: number,
  teams: ITeam[],
}) {
  return {
    type: FETCH_AGENCY_SUCCESS,
    payload: data,
  };
}

function fetchAgencyFailure() {
  return {
    type: FETCH_AGENCY_FAILURE,
  };
}

export function fetchAgency(params: {
  keyword: string,
  page: number,
  per_page: number,
}) {
  return async (dispatch: Dispatch) => {
    dispatch(fetchAgencyRequest());
    try {
      const resp = await axios.get('/api/v1/teams/agency/search/', { params });
      dispatch(fetchAgencySuccess(resp.data.data));
    } catch (err) {
      dispatch(fetchAgencyFailure());
    }
  };
}
