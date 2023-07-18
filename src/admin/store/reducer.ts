import { combineReducers } from "redux";

import auth from "./auth/reducer";
import users from "./users/reducer";
import teams from "./teams/reducer";
import agencies from "./agencies/reducer";

const rootReducer = combineReducers({
  auth,
  users,
  teams,
  agencies,
});

export default rootReducer;
