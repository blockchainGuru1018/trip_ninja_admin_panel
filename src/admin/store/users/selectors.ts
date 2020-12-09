import { createSelector } from "reselect";

const getUsersState = (state: any) => state;

/**
 *  get user list
 */
export const getUsers = createSelector(getUsersState, (state: { users: any; }) => {
  return state.users;
});

/**
 *  get total count
 */
export const getTotalCount = createSelector(getUsersState, (state: { total: any; }) => {
  return state.total;
});

/**
 *  get basic info
 */
export const getBasicInfo = createSelector(getUsersState, (state: { basic_info: any; }) => {
  return state.basic_info;
});

/**
 *  get general info
 */
export const getGeneralInfo = createSelector(getUsersState, (state: { basic_info: any; }) => {
  return state.basic_info;
});
