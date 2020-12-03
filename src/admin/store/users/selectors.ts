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
