import { combineReducers } from 'redux'

import moviesIndex from './moviesIndexReducer'
import carouselMovies from './carouselMoviesReducer'
import recentMovies from './recentMoviesReducer'
import search from './searchReducer'

export default combineReducers({
  moviesIndex,
  carouselMovies,
  recentMovies,
  search
})
