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
    const index = {}
  
    for (let genre of this.genres) {
      let slug = genre.toLowerCase()
  
      index[slug] = { text: genre, url: `/genres/${slug}` }
    }
  
    return index
  }
}

export default function moviesIndexReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_INDEX_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_MOVIES_INDEX_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the servers)

      return {
        ...state,
        ...new MoviesIndexData(action.payload.moviesIndex),
      }

    case FETCH_MOVIES_INDEX_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        moviesIndex: {},
        genres: [],
        genresIndex: {},
        loading: false,
        error: action.payload.error
      }

    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
