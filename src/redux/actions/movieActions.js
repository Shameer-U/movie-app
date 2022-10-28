import movieApi from "../../constants/movieApi";
import { ActionTypes } from "../constants/actionTypes"

const fetchMoviesData = (term, page) => async (dispatch) => {
    dispatch({type:ActionTypes.FETCHING_MOVIES_DATA, payload: {fetching : true, isLoaded: false, message: `Fetching data...`,}});

    let payload;
    try {
        const response = await movieApi.get(`/search/movie?page=${page}&query=${term}`);

        if (response?.status === 200) {
            if (response?.data?.results?.length !== 0) {
                payload =  {
                    status: true,
                    fetching : false,
                    isLoaded: true,
                    message: `Movie data fetched`,
                    data: response.data,
                }
            } else {
                payload =  {
                    status: false,
                    fetching : false,
                    isLoaded: false,
                    message: `Movie data not found`,
                    data: {}
                }
            }
        } else {
            payload =  {
                status: false,
                fetching : false,
                isLoaded: false,
                message: `Movie data not found`,
                data: {}
            }
        }
    } catch (error) {
        payload =  {
          status: false,
          fetching : false,
          isLoaded: false,
          message: `Movie data not found`,
          data: {}
        };
    }
    
    dispatch({type:ActionTypes.FETCH_MOVIES_DATA, payload:payload});
}

const removeMoviesData = () => {
    return {
        type: ActionTypes.REMOVE_MOVIES_DATA,
    }
}

export {fetchMoviesData, removeMoviesData}