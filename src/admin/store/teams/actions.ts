import { Dispatch } from "redux";

import { axios } from "../../utils";
import {
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
  ADD_TEAMS_REQUEST,
  ADD_TEAMS_SUCCESS,
  ADD_TEAMS_FAILURE,
  UPDATE_TEAMS_REQUEST,
  UPDATE_TEAMS_SUCCESS,
  UPDATE_TEAMS_FAILURE,
  ARCHIVE_TEAMS_SUCCESS,
} from "./actionTypes";

export interface ITeam {
  team_name: string;
  team_leader: string;
  agency_name: string;
  number_of_users: number;
  is_active: boolean;
  is_booking: boolean;
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

function addTeamRequest() {
  return { type: ADD_TEAMS_REQUEST };
}

function addTeamSuccess() {
  return {
    type: ADD_TEAMS_SUCCESS,
  };
}

function addTeamFailure() {
  return {
    type: ADD_TEAMS_FAILURE,
  };
}

export function addTeam(data: any, onSuccess: () => void) {
  return async (dispatch: Dispatch) => {
    dispatch(addTeamRequest());
    try {
      await axios.post('/api/v1/teams/add/', data);
      dispatch(addTeamSuccess());
      onSuccess();
    } catch (err) {
      dispatch(addTeamFailure());
    }
  };
}

function updateTeamRequest() {
  return { type: UPDATE_TEAMS_REQUEST };
}

function updateTeamSuccess(data: ITeam) {
  return {
    type: UPDATE_TEAMS_SUCCESS,
    payload: data,
  };
}

function updateTeamFailure() {
  return {
    type: UPDATE_TEAMS_FAILURE,
  };
}

export function updateTeam(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(updateTeamRequest());
    try {
      const resp = await axios.put('/api/v1/teams/update/', data);
      dispatch(updateTeamSuccess(resp.data.data.teams));
    } catch (err) {
      dispatch(updateTeamFailure());
    }
  };
}

function archiveTeamSuccess(id: number) {
  return {
    type: ARCHIVE_TEAMS_SUCCESS,
    payload: id,
  };
}

export function archiveTeam(id: number) {
  return async (dispatch: Dispatch) => {
    dispatch(updateTeamRequest());
    try {
      const resp = await axios.get(`/api/v1/teams/${id}/archive/`);
      if (resp.data.result) {
        dispatch(archiveTeamSuccess(id));
      }
    } catch (err) {
      dispatch(updateTeamFailure());
    }
  };
}

