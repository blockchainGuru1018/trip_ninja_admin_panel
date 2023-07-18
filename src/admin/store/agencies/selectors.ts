import { createSelector } from "reselect";

const getAgenciesState = (state: any) => state;

/**
 *  get agencies list
 */
export const getAgencies = createSelector(getAgenciesState, (state: { agencies: any; }) => {
  return state.agencies;
});

/**
 *  get total count
 */
export const getTotalCount = createSelector(getAgenciesState, (state: { total: any; }) => {
  return state.total;
});
