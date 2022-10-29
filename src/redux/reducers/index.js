import { combineReducers } from "redux";
import { moviesReducer } from "./movieReducer";
import { searchReducer } from "./searchReducer";
import { nowPlayingReducer } from "./nowPlayingReducer";
import { comingSoonReducer } from "./comingSoonReducer";
import { movieDetailReducer } from "./movieDetailReducer";

const reducers = combineReducers({
    moviesState: moviesReducer,
    searchState: searchReducer,
    nowPlayingState: nowPlayingReducer,
    comingSoonState: comingSoonReducer,
    movieDetailState: movieDetailReducer
});

export default reducers;