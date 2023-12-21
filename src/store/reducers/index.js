import { combineReducers } from "redux";
import userReducer from "./userReducer";
import customerReducer from "./customerReducer";

const rootReducer = combineReducers({
  user: userReducer,
  customerReducer: customerReducer,
});

export default rootReducer;
