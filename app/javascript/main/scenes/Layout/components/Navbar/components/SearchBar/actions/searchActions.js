// Movies Index Actions

// Types
// ========================================================
export const FETCH_SEARCH_RESULTS_BEGIN = 'FETCH_SEARCH_RESULTS_BEGIN'

export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS'

export const FETCH_SEARCH_RESULTS_FAILURE = 'FETCH_SEARCH_RESULTS_FAILURE'


// Dispatch Actions
// ========================================================
export const fetchSearchResultsBegin = () => ({
  type: FETCH_SEARCH_RESULTS_BEGIN
})

export const fetchSearchResultsSuccess = searchResults => ({
  type: FETCH_SEARCH_RESULTS_SUCCESS,
  payload: { searchResults }
})

export const fetchSearchResultsFailure = error => ({
  type: FETCH_SEARCH_RESULTS_FAILURE,
  payload: { error }
})


// API Action
// ========================================================
export function fetchSearchResults(query) {
  return async dispatch => {
    try {
      if (query === '') return

      dispatch(fetchSearchResultsBegin())

      const response = await fetch(`/api/search/${query}`)

      const data = await response.json()

      dispatch(fetchSearchResultsSuccess(data))

      return data
    
    } catch(error) {
      dispatch(fetchSearchResultsFailure(error))
    }
  }
}
