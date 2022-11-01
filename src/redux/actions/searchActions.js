import { ActionTypes } from "../constants/actionTypes";

export const addSearchTerm = (searchTerm) => {
    return {
        type: ActionTypes.GET_SEARCH_TERM,
        payload: searchTerm
    };
}