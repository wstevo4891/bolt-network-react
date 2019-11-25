import { combineReducers } from 'redux'

import moviesIndex from './moviesIndexReducer'
import carouselMovies from './carouselMoviesReducer'
import recentMovies from './recentMoviesReducer'
import search from './searchReducer'
import counter from './counterReducer'

export default combineReducers({
  moviesIndex,
  carouselMovies,
  recentMovies,
  search,
  counter
})
