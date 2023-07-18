import * as types from "./actionTypes";

export const usersInitialState = {
  isSubmitting: false,
};

export default (state = usersInitialState, action: any) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
};
