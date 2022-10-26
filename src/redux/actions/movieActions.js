import movieApi from "../../constants/movieApi";
import { ActionTypes } from "../constants/actionTypes"

export const fetchMovieData = (term, page) => async (dispatch) => {
    const response = await movieApi.get(`/search/movie?page=${page}&query=${term}`);
    dispatch({type:ActionTypes.FETCH_MOVIE_DATA, payload:response.data});
}

export const removeMovieData = () => {
    return {
        type: ActionTypes.REMOVE_MOVIE_DATA,
    }
}