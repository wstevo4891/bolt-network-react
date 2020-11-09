// Banner Movies Actions

// Types
// ========================================================
import {
  FETCH_BANNER_MOVIES_BEGIN,
  FETCH_BANNER_MOVIES_SUCCESS,
  FETCH_BANNER_MOVIES_FAILURE
} from '../types'

// Dispatch Actions
// ========================================================
export const fetchBannerMoviesBegin = () => ({
  type: FETCH_BANNER_MOVIES_BEGIN
})

export const fetchBannerMoviesSuccess = movies => ({
  type: FETCH_BANNER_MOVIES_SUCCESS,
  payload: { movies }
})

export const fetchBannerMoviesFailure = error => ({
  type: FETCH_BANNER_MOVIES_FAILURE,
  payload: { error }
})

// API Actions
// ========================================================
function fetchResponse(titles) {
  return fetch('/api/movies/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ titles })
  })
}

export function fetchBannerMovies(titles) {
  return async dispatch => {
    try {
      dispatch(fetchBannerMoviesBegin())
      const response = await fetchResponse(titles)
      const data = await response.json()
      dispatch(fetchBannerMoviesSuccess(data))
      return data
    } catch(error) {
      dispatch(fetchBannerMoviesFailure(error))
    }
  }
}
