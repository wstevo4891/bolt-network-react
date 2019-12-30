// Recent Movies Reducer

// Constants
// ==================================================================
import {
  FETCH_RECENT_MOVIES_BEGIN,
  FETCH_RECENT_MOVIES_SUCCESS,
  FETCH_RECENT_MOVIES_FAILURE
} from '../types/recentMoviesTypes'

const initialState = {
  movies: [],
  loading: false,
  error: null
}

export default function recentMoviesReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_RECENT_MOVIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_RECENT_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload.movies,
        loading: false
      }

    case FETCH_RECENT_MOVIES_FAILURE:
      return {
        ...state,
        error: action.payload.error
      }

    default:
      return state
  }
}
