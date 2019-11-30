import { combineReducers } from 'redux'

import moviesIndex from './moviesIndexReducer'
import bannerMovies from './bannerMoviesReducer'
import recentMovies from './recentMoviesReducer'
import search from './searchReducer'

export default combineReducers({
  moviesIndex,
  bannerMovies,
  recentMovies,
  search
})
