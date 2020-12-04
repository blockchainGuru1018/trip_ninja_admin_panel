import { combineReducers } from "redux";

import users from "./users/reducer";
import teams from "./teams/reducer";
import agencies from "./agencies/reducer";

const rootReducer = combineReducers({
  users,
  teams,
  agencies,
});

export default rootReducer;
