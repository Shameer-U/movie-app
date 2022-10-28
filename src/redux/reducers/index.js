import { combineReducers } from "redux";
import { moviesReducer } from "./movieReducer";
import { searchReducer } from "./searchReducer";
import { nowPlayingReducer } from "./nowPlayingReducer";
import { comingSoonReducer } from "./comingSoonReducer";

const reducers = combineReducers({
    moviesState: moviesReducer,
    searchState: searchReducer,
    nowPlayingState: nowPlayingReducer,
    comingSoonState: comingSoonReducer
});

export default reducers;