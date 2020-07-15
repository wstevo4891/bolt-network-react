// Search Results Reducer

// Types
// ==================================================================
import {
  FETCH_SUGGESTIONS_BEGIN,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_FAILURE,
  RESET_SUGGESTIONS
} from '../types'

// Helper Functions
// ==================================================================
import { createReducer, MoviesState } from './helpers'

// Initial Store State
const initialState = new MoviesState

const fetchBeginState = (_state, _action) =>
  new MoviesState({ loading: true })

const fetchSuccessState = (_state, action) =>
  new MoviesState({
    movies: action.payload.suggestions.movies
  })

const fetchErrorState = (_state, action) =>
  new MoviesState({
    error: action.payload.error
  })

const suggestionsReducer = createReducer(initialState, {
  [FETCH_SUGGESTIONS_BEGIN]: fetchBeginState,
  [FETCH_SUGGESTIONS_SUCCESS]: fetchSuccessState,
  [FETCH_SUGGESTIONS_FAILURE]: fetchErrorState,
  [RESET_SUGGESTIONS]: (state, _action) => state
})

export default suggestionsReducer
