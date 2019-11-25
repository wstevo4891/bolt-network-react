// Movies Index Actions

// Types
// ==================================================================
import {
  FETCH_MOVIES_INDEX_BEGIN,
  FETCH_MOVIES_INDEX_SUCCESS,
  FETCH_MOVIES_INDEX_FAILURE
} from '../types/moviesIndexTypes'


// Dispatch Actions
// ==================================================================
export const fetchMoviesIndexBegin = () => ({
  type: FETCH_MOVIES_INDEX_BEGIN
})

export const fetchMoviesIndexSuccess = moviesIndex => ({
  type: FETCH_MOVIES_INDEX_SUCCESS,
  payload: { moviesIndex }
})

export const fetchMoviesIndexFailure = error => ({
  type: FETCH_MOVIES_INDEX_FAILURE,
  payload: { error }
})


// API Action
// ==================================================================

export const URI = '/api/movies-index'

export function fetchMoviesIndex() {
  return async dispatch => {
    try {
      dispatch(fetchMoviesIndexBegin())

      const response = await fetch(URI)

      const data = await response.json()

      dispatch(fetchMoviesIndexSuccess(data))

      return data
    
    } catch(error) {
      dispatch(fetchMoviesIndexFailure(error))
    }
  }
}
