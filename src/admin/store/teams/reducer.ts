import * as types from "./actionTypes";

export const teamsInitialState = {
  isFetching: false,
  isSubmitting: false,
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
    case types.ADD_TEAMS_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.ADD_TEAMS_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case types.ADD_TEAMS_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };
    case types.UPDATE_TEAMS_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.UPDATE_TEAMS_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        teams: state.teams.map((el: any) => {
          if (el.team_id === action.payload.team_id) {
            return {
              ...el,
              ...action.payload
            }
          }

          return el;
        })
      };
    case types.UPDATE_TEAMS_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };
    case types.ARCHIVE_TEAMS_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        teams: state.teams.map((el: any) => {
          if (el.team_id === action.payload) {
            return {
              ...el,
              is_active: !el.is_active,
            }
          }

          return el;
        })
      };
    default:
      return state;
  }
};
