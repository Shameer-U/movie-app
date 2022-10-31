import { ActionTypes } from "../constants/actionTypes"

const initialState = {
    message : 'Movie data not found',
    status : false,
    fetching : false,
    isLoaded : false,
    data : { }
}

export const comingSoonReducer = (state = initialState, {type, payload}) => {  
    switch (type) {
        case ActionTypes.FETCHING_COMING_SOON:
            return {...state, ...payload}
        case ActionTypes.FETCH_COMING_SOON:
            return {...state,  ...payload};
        case ActionTypes.REMOVE_COMING_SOON:
            return initialState;
        default:
            return state;
    }
}