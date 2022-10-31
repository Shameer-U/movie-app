import movieApi from "../../constants/movieApi";
import { ActionTypes } from "../constants/actionTypes"

const fetchComingSoon = () => (dispatch) => {
    dispatch({type:ActionTypes.FETCHING_COMING_SOON, payload: {fetching : true, isLoaded: false, message: `Fetching data...`,}})

    let payload;
    
    movieApi.get('/movie/upcoming')
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
                
                dispatch({type:ActionTypes.FETCH_COMING_SOON, payload: payload});
            })
            .catch((error) => {
                payload =  {
                            status: false,
                            fetching : false,
                            isLoaded: false,
                            message: `Movie data not found`,
                            data: {}
                        }

                dispatch({type:ActionTypes.FETCH_COMING_SOON, payload: payload});
            })
    
    //dispatch({type:ActionTypes.FETCH_COMING_SOON, payload: payload});
}

const removeComingSoon = () => {
    return {
        type: ActionTypes.REMOVE_COMING_SOON,
    }
}

export {fetchComingSoon, removeComingSoon}