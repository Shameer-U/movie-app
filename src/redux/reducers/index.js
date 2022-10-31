import { combineReducers } from "redux";
import { moviesReducer } from "./movieReducer";
import { searchReducer } from "./searchReducer";
import { nowPlayingReducer } from "./nowPlayingReducer";
import { topRatedReducer } from "./topRatedReducer";
import { movieDetailReducer } from "./movieDetailReducer";

const reducers = combineReducers({
    moviesState: moviesReducer,
    searchState: searchReducer,
    nowPlayingState: nowPlayingReducer,
    topRatedState: topRatedReducer,
    movieDetailState: movieDetailReducer
});

export default reducers;