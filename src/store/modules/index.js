import {combineReducers} from "redux";
import serviceReducer from "./service";
import testReducer from "./tests";
import resultReducer from "./result";

export default combineReducers({
    serviceReducer,
    testReducer,
    resultReducer,
});
