import movieApi from "../../constants/movieApi";
import { ActionTypes } from "../constants/actionTypes";

const fetchMovieDetail = (movieId, append_to_response = 'videos,credits' ) => async (dispatch) => {
    dispatch({type:ActionTypes.FETCHING_MOVIE_DETAIL, payload: {fetching : true, isLoaded: false, message: `Fetching data...`,}});

    let payload;
    
    const response = await movieApi.get(`/movie/${movieId}`, { params: { append_to_response }})
                                .catch((error) => {
                                    return error.response;
                                });

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

    dispatch({type:ActionTypes.FETCH_MOVIE_DETAIL, payload: payload});
}

const removeMovieDetail = () => {
    return {
        type: ActionTypes.REMOVE_MOVIE_DETAIL,
    };
}

export {fetchMovieDetail, removeMovieDetail}