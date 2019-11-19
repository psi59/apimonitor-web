import {combineReducers} from "redux";
import serviceReducer from "./service";
import testReducer from "./tests";

export default combineReducers({
    serviceReducer,
    testReducer,
});
