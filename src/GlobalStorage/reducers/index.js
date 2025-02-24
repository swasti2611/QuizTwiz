import userData from "./userData";
import refreshUser from "./refresh";
import clientId from "./clientid";
import { combineReducers } from "redux";
import userReducer from "./userReducer";

const allReducers = combineReducers({
  userData,
  refreshUser,
  clientId,
  userReducer,
});

export default allReducers;
