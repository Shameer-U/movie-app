import movieApi from "../../constants/movieApi";
import { ActionTypes } from "../constants/actionTypes"

const fetchNowPlaying = () => async (dispatch) => {
    dispatch({type:ActionTypes.FETCHING_NOW_PLAYING, payload: {fetching : true, isLoaded: false, message: `Fetching data...`,}})

    let payload;
    try {
        const response = await movieApi.get('/movie/now_playing')

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
    
    dispatch({type:ActionTypes.FETCH_NOW_PLAYING, payload: payload});
}

const removeNowPlaying = () => {
    return {
        type: ActionTypes.REMOVE_NOW_PLAYING,
    }
}

export {fetchNowPlaying, removeNowPlaying}