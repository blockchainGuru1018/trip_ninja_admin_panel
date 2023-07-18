import * as types from "./actionTypes";

export const agenciesInitialState = {
  isFetching: false,
  isSubmitting: false,
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
    case types.ADD_AGENCIES_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.ADD_AGENCIES_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case types.ADD_AGENCIES_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };
    case types.UPDATE_AGENCIES_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.UPDATE_AGENCIES_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        agencies: state.agencies.map((el: any) => {
          if (el.agency_id === action.payload.agency_id) {
            return {
              ...el,
              ...action.payload
            }
          }

          return el;
        })
      };
    case types.UPDATE_AGENCIES_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };
    case types.ARCHIVE_AGENCIES_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        agencies: state.agencies.map((el: any) => {
          if (el.agency_id === action.payload) {
            return {
              ...el,
              status: !el.status,
            }
          }

          return el;
        })
      };
    default:
      return state;
  }
};

