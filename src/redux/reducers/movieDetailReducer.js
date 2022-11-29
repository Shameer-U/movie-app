import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    message : 'Movie data not found',
    status : false,
    fetching : false,
    isLoaded : false,
    data : { }
};

export const movieDetailReducer = (state = initialState, {type, payload}) => {  
    switch (type) {
        case ActionTypes.FETCHING_MOVIE_DETAIL:
            return {...state, ...payload};
        case ActionTypes.FETCH_MOVIE_DETAIL:
            return {...state,  ...payload};
        case ActionTypes.REMOVE_MOVIE_DETAIL:
            return {...state,  ...payload};
        default:
            return state;
    }
}