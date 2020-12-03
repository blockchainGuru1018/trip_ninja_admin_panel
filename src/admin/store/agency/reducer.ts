import * as types from "./actionTypes";

export const agencyInitialState = {
  isFetching: false,
  agency: [],
  total: 0,
};

export default (state = agencyInitialState, action: any) => {
  switch (action.type) {
    case types.FETCH_AGENCY_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_AGENCY_SUCCESS:
      return {
        ...state,
        agency: action.payload.agency,
        total: action.payload.number_of_agencies,
        isFetching: false,
      };
    case types.FETCH_AGENCY_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
