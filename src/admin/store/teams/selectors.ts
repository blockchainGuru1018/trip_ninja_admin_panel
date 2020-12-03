import { createSelector } from "reselect";

const getTeamsState = (state: any) => state;

/**
 *  get team list
 */
export const getTeams = createSelector(getTeamsState, (state: { teams: any; }) => {
  return state.teams;
});

/**
 *  get total count
 */
export const getTotalCount = createSelector(getTeamsState, (state: { total: any; }) => {
  return state.total;
});
