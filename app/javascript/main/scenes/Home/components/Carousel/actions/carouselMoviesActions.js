// Carousel Movies Actions

import API from '../services/API'

// Constants
// ========================================================
const FETCH_CAROUSEL_MOVIES_BEGIN = 'FETCH_CAROUSEL_MOVIES_BEGIN'

const FETCH_CAROUSEL_MOVIES_SUCCESS = 'FETCH_CAROUSEL_MOVIES_SUCCESS'

const FETCH_CAROUSEL_MOVIES_FAILURE = 'FETCH_CAROUSEL_MOVIES_FAILURE'


// Dispatch Functions
// ========================================================
const fetchCarouselMoviesBegin = () => ({
  type: FETCH_CAROUSEL_MOVIES_BEGIN
})

const fetchCarouselMoviesSuccess = movies => ({
  type: FETCH_CAROUSEL_MOVIES_SUCCESS,
  payload: { movies }
})

const fetchCarouselMoviesFailure = error => ({
  type: FETCH_CAROUSEL_MOVIES_FAILURE,
  payload: { error }
})


// Export Function
// ========================================================
export function fetchCarouselMovies(titles) {
  return async dispatch => {
    try {
      dispatch(fetchCarouselMoviesBegin())

      const response = await API.movies.search(titles)

      const data = await response.json()

      dispatch(fetchCarouselMoviesSuccess(data))

      return data
    
    } catch(error) {
      dispatch(fetchCarouselMoviesFailure(error))
    }
  }
}
