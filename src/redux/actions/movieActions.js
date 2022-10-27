import movieApi from "../../constants/movieApi";
import { ActionTypes } from "../constants/actionTypes"

export const fetchMoviesData = (term, page) => async (dispatch) => {
    dispatch({type:ActionTypes.FETCHING_MOVIES_DATA, payload: {fetching : true}});

    let payload;
    try {
        const response = await movieApi.get(`/search/movie?page=${page}&query=${term}`);

        if (response?.status === 200) {
            if (response?.data?.results?.length != 0) {
                payload =  {
                    status: true,
                    fetching : false,
                    message: `Movie data fetched`,
                    data: response.data,
                }
            } else {
                payload =  {
                    status: false,
                    fetching : false,
                    message: `Movie data not found`,
                }
            }
        } else {
            payload =  {
                status: false,
                fetching : false,
                message: `Movie data not found`,
            }
        }
    } catch (error) {
        payload =  {
          status: false,
          fetching : false,
          message: `Movie data not found`,
        };
    }
    
    dispatch({type:ActionTypes.FETCH_MOVIES_DATA, payload:payload});
}

export const removeMoviesData = () => {
    return {
        type: ActionTypes.REMOVE_MOVIES_DATA,
    }
}