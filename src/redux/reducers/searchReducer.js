import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    term: '',
};

export const searchReducer = (state = initialState, action) => {  
    switch (action.type) {
        case ActionTypes.GET_SEARCH_TERM:
            return {term: action.payload};
        default:
            return state;
    }
}