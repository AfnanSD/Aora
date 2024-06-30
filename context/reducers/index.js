import { combineReducers } from "redux";
import counterReduer from "./counterReducer";

const rootReducer = combineReducers({
    counter: counterReduer
})

export default rootReducer