// Movies Index Actions

// Types
// ========================================================
import {
  FETCH_SUGGESTIONS_BEGIN,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_FAILURE,
  RESET_SUGGESTIONS
} from '../types'

// Dispatch Actions
// ========================================================
export const fetchSuggestionsBegin = () => ({
  type: FETCH_SUGGESTIONS_BEGIN
})

export const fetchSuggestionsSuccess = suggestions => ({
  type: FETCH_SUGGESTIONS_SUCCESS,
  payload: { suggestions }
})

export const fetchSuggestionsFailure = error => ({
  type: FETCH_SUGGESTIONS_FAILURE,
  payload: { error }
})

export const resetSuggestions = () => ({
  type: RESET_SUGGESTIONS
})


// API Actions
// ========================================================
export function fetchSuggestions({ query, suggestionId }) {
  return async dispatch => {
    try {
      dispatch(fetchSuggestionsBegin())

      const response = await fetch(`/api/suggestions/${query}/${suggestionId}`)

      const data = await response.json()

      dispatch(fetchSuggestionsSuccess(data))

      return data
    
    } catch(error) {
      dispatch(fetchSuggestionsFailure(error))
    }
  }
}
