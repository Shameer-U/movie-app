import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    message : 'Movie data not found',
    status : false,
    fetching : false,
    isLoaded : false,
    data : { }
};

export const nowPlayingReducer = (state = initialState, {type, payload}) => {  
    switch (type) {
        case ActionTypes.FETCHING_NOW_PLAYING:
            return {...state, ...payload};
        case ActionTypes.FETCH_NOW_PLAYING:
            return {...state,  ...payload};
        case ActionTypes.REMOVE_NOW_PLAYING:
            return {...state, ...payload};
        default:
            return state;
    }
}