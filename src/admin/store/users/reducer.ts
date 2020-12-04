import * as types from "./actionTypes";

export const usersInitialState = {
  isFetching: false,
  isSubmitting: false,
  users: [],
  total: 0,
};

export default (state = usersInitialState, action: any) => {
  switch (action.type) {
    case types.FETCH_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        total: action.payload.number_of_users,
        isFetching: false,
      };
    case types.FETCH_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case types.ADD_USER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.ADD_USER_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case types.ADD_USER_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
};
