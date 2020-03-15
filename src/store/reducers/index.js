import { combineReducers } from "redux";
import users from "./users";
import time_sheets from "./time_sheets";

export default combineReducers({ users, time_sheets });
