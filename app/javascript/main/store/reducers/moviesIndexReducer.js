// Movies Index Reducer

// Constants
// ==================================================================
import {
  FETCH_MOVIES_INDEX_BEGIN,
  FETCH_MOVIES_INDEX_SUCCESS,
  FETCH_MOVIES_INDEX_FAILURE,
} from '../types'

const initialState = {
  moviesIndex: {},
  genres: [],
  genresIndex: {},
  loading: false,
  error: null
}

class MoviesIndexData {
  constructor(moviesIndex) {
    this.moviesIndex = moviesIndex
    this.genres = Object.keys(moviesIndex)
    this.genresIndex = this.buildGenresIndex()
  }

  buildGenresIndex() {
    let slug
    const index = {}

    for (let genre of this.genres) {
      slug = genre.toLowerCase()
  
      index[slug] = { text: genre, url: `/genres/${slug}` }
    }

    return index
  }
}

export default function moviesIndexReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_INDEX_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_MOVIES_INDEX_SUCCESS:
      return {
        ...state,
        ...new MoviesIndexData(action.payload.moviesIndex),
      }

    case FETCH_MOVIES_INDEX_FAILURE:
      return {
        ...state,
        moviesIndex: {},
        genres: [],
        genresIndex: {},
        loading: false,
        error: action.payload.error
      }

    default:
      return state
  }
}
