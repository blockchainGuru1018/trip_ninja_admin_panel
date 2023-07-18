import * as types from "./actionTypes";

export const usersInitialState = {
  isFetching: false,
  isSubmitting: false,
  users: [],
  basic_info: {},
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
    case types.UPDATE_USER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        users: state.users.map((el: any) => {
          if (el.user_id === action.payload.user_id) {
            return {
              ...el,
              ...action.payload
            }
          }

          return el;
        })
      };
    case types.UPDATE_USER_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };
    case types.ARCHIVE_USER_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        users: state.users.map((el: any) => {
          if (el.user_id === action.payload) {
            return {
              ...el,
              is_active: !el.is_active,
            }
          }

          return el;
        })
      };
    case types.FETCH_BASIC_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_BASIC_INFO_SUCCESS:
      return {
        ...state,
        basic_info: action.payload.user_info,
        isFetching: false,
      };
    case types.FETCH_BASIC_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case types.UPDATE_BASIC_INFO_REQUEST:
      return {
        ...state,
      };
    case types.UPDATE_BASIC_INFO_SUCCESS:
      return {
        ...state,
        basic_info: action.payload.user_info,
      };
    case types.UPDATE_BASIC_INFO_FAILURE:
      return {
        ...state,
      };

    case types.FETCH_GENERAL_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_GENERAL_INFO_SUCCESS:
      return {
        ...state,
        basic_info: action.payload.user_info,
        isFetching: false,
      };
    case types.FETCH_GENERAL_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case types.UPDATE_GENERAL_INFO_REQUEST:
      return {
        ...state,
      };
    case types.UPDATE_GENERAL_INFO_SUCCESS:
      return {
        ...state,
        basic_info: action.payload.user_info,
      };
    case types.UPDATE_GENERAL_INFO_FAILURE:
      return {
        ...state,
      };

    case types.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case types.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
};
