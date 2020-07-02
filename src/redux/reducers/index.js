import { combineReducers } from "redux";
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import sitesReducer from "./sitesReducer";

export default combineReducers({
    alertReducer,
    authReducer,
    sitesReducer
})
