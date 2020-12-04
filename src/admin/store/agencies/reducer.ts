import * as types from "./actionTypes";

export const agenciesInitialState = {
  isFetching: false,
  agencies: [],
  total: 0,
};

export default (state = agenciesInitialState, action: any) => {
  switch (action.type) {
    case types.FETCH_AGENCIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_AGENCIES_SUCCESS:
      return {
        ...state,
        agencies: action.payload.agency,
        total: action.payload.number_of_agencies,
        isFetching: false,
      };
    case types.FETCH_AGENCIES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
