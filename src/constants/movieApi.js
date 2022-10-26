import axios from 'axios';
import { TMDB_BASE_URL, TMDB_API_KEY } from './Urls';

export default axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
      api_key: TMDB_API_KEY,
    },
})
