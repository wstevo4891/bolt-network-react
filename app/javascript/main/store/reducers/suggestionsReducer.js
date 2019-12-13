// Search Results Reducer

// Types
// ==================================================================
import {
  FETCH_SUGGESTIONS_BEGIN,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_FAILURE
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
      const { genres, movies, people } = action.payload.suggestions

      return {
        ...state,
        movies: movies,
        loading: false
      }

    case FETCH_SUGGESTIONS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        movies: [],
        loading: false,
        error: action.payload.error
      }

    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
