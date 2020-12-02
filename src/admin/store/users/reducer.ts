import * as types from "./actionTypes";

export const usersInitialState = {
  isFetching: false,
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
    default:
      return state;
  }
};
