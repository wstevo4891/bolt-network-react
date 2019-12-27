// Search Results Reducer

// Types
// ==================================================================
import {
  FETCH_SUGGESTIONS_BEGIN,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_FAILURE,
  RESET_SUGGESTIONS
} from '../types/suggestionsTypes'

// Initial Store State
const initialState = {
  movies: [],
  loading: false,
  error: null
}

export default function suggestionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUGGESTIONS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_SUGGESTIONS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        movies: action.payload.suggestions,
        loading: false
      }

    case FETCH_SUGGESTIONS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      return {
        ...state,
        movies: [],
        loading: false,
        error: action.payload.error
      }

    case RESET_SUGGESTIONS:
      return state

    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
