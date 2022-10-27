import { combineReducers } from "redux";
import { moviesReducer } from "./movieReducer";
import { searchReducer } from "./searchReducer";

const reducers = combineReducers({
    moviesState: moviesReducer,
    searchState: searchReducer
});

export default reducers;