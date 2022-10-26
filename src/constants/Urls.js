const config = require('../../package.json');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch'

const TMDB_API_KEY = config.projectConfig.apiKey

const ENDPOINTS = {
  NOW_PLAYING_MOVIES: '/movie/now_playing',
  UPCOMING_MOVIES: '/movie/upcoming',
  GENRES: '/genre/movie/list',
  MOVIE: '/movie',
  //SEARCH: `/search/movie?api_key=${TMDB_API_KEY}&query=`,
  SEARCH: `/search/movie?page=2&query=`,
}

export {
  TMDB_BASE_URL,
  TMDB_API_KEY,
  TMDB_IMAGE_BASE_URL,
  YOUTUBE_BASE_URL,
  ENDPOINTS,
}
