import { Dispatch } from "redux";

import { axios } from "../../utils";
import {
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
} from "./actionTypes";

export interface ITeam {
  team_name: string;
  team_leader: string;
  number_of_users: number;
}

function fetchTeamsRequest() {
  return { type: FETCH_TEAMS_REQUEST };
}

function fetchTeamsSuccess(data: {
  number_of_teams: number,
  teams: ITeam[],
}) {
  return {
    type: FETCH_TEAMS_SUCCESS,
    payload: data,
  };
}

function fetchTeamsFailure() {
  return {
    type: FETCH_TEAMS_FAILURE,
  };
}

export function fetchTeams(params: {
  keyword: string,
  page: number,
  per_page: number,
}) {
  return async (dispatch: Dispatch) => {
    dispatch(fetchTeamsRequest());
    try {
      const resp = await axios.get('/api/v1/teams/search/', { params });
      dispatch(fetchTeamsSuccess(resp.data.data));
    } catch (err) {
      dispatch(fetchTeamsFailure());
    }
  };
}
