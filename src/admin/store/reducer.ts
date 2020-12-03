import { combineReducers } from "redux";

import users from "./users/reducer";
import teams from "./teams/reducer";
import agency from "./agency/reducer";

const rootReducer = combineReducers({
  users,
  teams,
  agency,
});

export default rootReducer;
