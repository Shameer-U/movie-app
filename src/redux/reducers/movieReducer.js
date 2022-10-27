import { ActionTypes } from "../constants/actionTypes"

const initialState = {
    message : 'Movie data not found',
    status : false,
    fetching : false,
    data : {
        results: [],
        page: 0,
        total_pages: 0,
        total_results: 0,
    }
}

export const moviesReducer = (state = initialState, {type, payload}) => {  
    switch (type) {
        case ActionTypes.FETCHING_MOVIES_DATA:
            return {...state, ...payload}
        case ActionTypes.FETCH_MOVIES_DATA:
            return {...state,  ...payload};
        case ActionTypes.REMOVE_MOVIES_DATA:
            return initialState;
        default:
            return state;
    }
}