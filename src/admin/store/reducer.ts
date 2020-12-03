import { combineReducers } from "redux";

import users from "./users/reducer";
import teams from "./teams/reducer";

const rootReducer = combineReducers({
  users,
  teams,
});

export default rootReducer;
