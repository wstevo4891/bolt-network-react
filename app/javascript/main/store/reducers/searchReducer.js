// Search Results Reducer

// Types
// ==================================================================
import {
  FETCH_SEARCH_RESULTS_BEGIN,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_FAILURE
} from '../types/searchTypes'

// Initial Store State
const initialState = {
  genres: [],
  movies: [],
  people: [],
  loading: false,
  error: null
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_SEARCH_RESULTS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      const { genres, movies, people } = action.payload.searchResults

      return {
        ...state,
        genres: genres,
        movies: movies,
        people: people,
        loading: false
      }

    case FETCH_SEARCH_RESULTS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        genres: [],
        movies: [],
        people: [],
        loading: false,
        error: action.payload.error
      }

    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
