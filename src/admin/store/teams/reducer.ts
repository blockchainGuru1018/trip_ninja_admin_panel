import * as types from "./actionTypes";

export const teamsInitialState = {
  isFetching: false,
  teams: [],
  total: 0,
};

export default (state = teamsInitialState, action: any) => {
  switch (action.type) {
    case types.FETCH_TEAMS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.payload.teams,
        total: action.payload.number_of_teams,
        isFetching: false,
      };
    case types.FETCH_TEAMS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
