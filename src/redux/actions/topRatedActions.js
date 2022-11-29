import movieApi from "../../constants/movieApi";
import { ActionTypes } from "../constants/actionTypes";

export const fetchTopRated = () => (dispatch) => {
    dispatch({type:ActionTypes.FETCHING_TOP_RATED, payload: {fetching : true, isLoaded: false, message: `Fetching data...`,}});

    let payload;
    
    movieApi.get('/movie/top_rated')
            .then((response) => {
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
                
                dispatch({type:ActionTypes.FETCH_TOP_RATED, payload: payload});
            })
            .catch((error) => {
                payload =  {
                            status: false,
                            fetching : false,
                            isLoaded: false,
                            message: `Movie data not found`,
                            data: {}
                        }

                dispatch({type:ActionTypes.FETCH_TOP_RATED, payload: payload});
            });
    
    //dispatch({type:ActionTypes.FETCH_TOP_RATED, payload: payload});
}

export const removeTopRated = () => {
    const payload =  {
        status: true,
        fetching : false,
        isLoaded: true,
        message: `Movie data removed`,
        data: {},
    }

    return {
        type: ActionTypes.REMOVE_TOP_RATED, payload
    };
}