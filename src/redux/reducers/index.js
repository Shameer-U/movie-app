import { combineReducers } from "redux";
import { movieReducer } from "./movieReducer";

const reducers = combineReducers({
    movieReducer: movieReducer,
});

export default reducers;