import { combineReducers } from "redux";

import users from "./users/reducer";

const rootReducer = combineReducers({
  users,
});

export default rootReducer;
