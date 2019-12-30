// Search Results Reducer

// Helper Functions
// ==================================================================
import { createReducer, MoviesState } from './helpers'

// Types
// ==================================================================
import {
  FETCH_SUGGESTIONS_BEGIN,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_FAILURE,
  RESET_SUGGESTIONS
} from '../types/suggestionsTypes'

// Initial Store State
const initialState = new MoviesState

const fetchBeginState = (state, action) => new MoviesState({ loading: true })

const fetchSuccessState = (state, action) => new MoviesState({
  movies: action.payload.suggestions.movies
})

const fetchErrorState = (state, action) => new MoviesState({
  error: action.payload.error
})

const resetState = (state, action) => state

const suggestionsReducer = createReducer(initialState, {
  [FETCH_SUGGESTIONS_BEGIN]: fetchBeginState,
  [FETCH_SUGGESTIONS_SUCCESS]: fetchSuccessState,
  [FETCH_SUGGESTIONS_FAILURE]: fetchErrorState,
  [RESET_SUGGESTIONS]: resetState
})

// const initialState = {
//   movies: [],
//   loading: false,
//   error: null
// }

// function suggestionsReducer(state = initialState, action) {
//   switch (action.type) {
//     case FETCH_SUGGESTIONS_BEGIN:
//       // Mark the state as "loading" so we can show a spinner or something
//       // Also, reset any errors. We're starting fresh.
//       return {
//         ...state,
//         loading: true
//       }

//     case FETCH_SUGGESTIONS_SUCCESS:
//       // All done: set loading "false".
//       // Also, replace the items with the ones from the server
//       return {
//         ...state,
//         movies: action.payload.suggestions.movies
//       }

//     case FETCH_SUGGESTIONS_FAILURE:
//       // The request failed. It's done. So set loading to "false".
//       // Save the error, so we can display it somewhere.
//       return {
//         ...state,
//         error: action.payload.error
//       }

//     case RESET_SUGGESTIONS:
//       return state

//     default:
//       // ALWAYS have a default case in a reducer
//       return state
//   }
// }

export default suggestionsReducer
