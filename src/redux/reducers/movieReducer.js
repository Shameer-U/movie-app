import { ActionTypes } from "../constants/actionTypes"

const initialState = {
    movies: [],
    page: 0,
    total_pages: 0,
    total_results: 0,
}

export const movieReducer = (state = initialState, {type, payload}) => {  
    switch (type) {
        case ActionTypes.FETCH_MOVIE_DATA:
            return {...state, movies: payload.results, page: payload.page, total_pages: payload.total_pages, total_results: payload.total_results};
        case ActionTypes.REMOVE_MOVIE_DATA:
            return initialState;
        default:
            return state;
    }
}