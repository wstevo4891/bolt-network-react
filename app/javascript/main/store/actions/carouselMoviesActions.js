// Carousel Movies Actions

// Types
// ========================================================
import {
  FETCH_CAROUSEL_MOVIES_BEGIN,
  FETCH_CAROUSEL_MOVIES_SUCCESS,
  FETCH_CAROUSEL_MOVIES_FAILURE
} from '../types/carouselMoviesTypes'


// Dispatch Actions
// ========================================================
export const fetchCarouselMoviesBegin = () => ({
  type: FETCH_CAROUSEL_MOVIES_BEGIN
})

export const fetchCarouselMoviesSuccess = movies => ({
  type: FETCH_CAROUSEL_MOVIES_SUCCESS,
  payload: { movies }
})

export const fetchCarouselMoviesFailure = error => ({
  type: FETCH_CAROUSEL_MOVIES_FAILURE,
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
    body: JSON.stringify({ titles: titles })
  })
}

export function fetchCarouselMovies(titles) {
  return async dispatch => {
    try {
      dispatch(fetchCarouselMoviesBegin())

      const response = await fetchResponse(titles)

      const data = await response.json()

      dispatch(fetchCarouselMoviesSuccess(data))

      return data
    
    } catch(error) {
      dispatch(fetchCarouselMoviesFailure(error))
    }
  }
}
