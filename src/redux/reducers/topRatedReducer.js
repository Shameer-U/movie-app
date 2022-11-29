import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    message : 'Movie data not found',
    status : false,
    fetching : false,
    isLoaded : false,
    data : { }
};

export const topRatedReducer = (state = initialState, {type, payload}) => {  
    switch (type) {
        case ActionTypes.FETCHING_TOP_RATED:
            return {...state, ...payload};
        case ActionTypes.FETCH_TOP_RATED:
            return {...state,  ...payload};
        case ActionTypes.REMOVE_TOP_RATED:
            return {...state,  ...payload};
        default:
            return state;
    }
}