import { createSelector } from "reselect";

const getAgencyState = (state: any) => state;

/**
 *  get agency list
 */
export const getAgency = createSelector(getAgencyState, (state: { agency: any; }) => {
  return state.agency;
});

/**
 *  get total count
 */
export const getTotalCount = createSelector(getAgencyState, (state: { total: any; }) => {
  return state.total;
});
