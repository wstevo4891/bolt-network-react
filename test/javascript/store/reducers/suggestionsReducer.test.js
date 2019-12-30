import * as types from '@store/types/suggestionsTypes'
import reducer from '@store/reducers/suggestionsReducer'

describe('suggestionsReducer', () => {
  const initialState = {
    movies: [],
    loading: false,
    error: null
  }

  const PAYLOAD = [
    { title: 'Trainwreck' },
    { title: 'Borat' },
    { title: 'Deadpool' }
  ]

  const REDUCER_ERROR = new Error('Failure in suggestionsReducer')

  const beginAction = {
    type: types.FETCH_SUGGESTIONS_BEGIN
  }

  const successAction = {
    type: types.FETCH_SUGGESTIONS_SUCCESS,
    payload: { suggestions: { movies: PAYLOAD } }
  }

  const failureAction = {
    type: types.FETCH_SUGGESTIONS_FAILURE,
    payload: { error: REDUCER_ERROR }
  }

  const resetAction = {
    type: types.RESET_SUGGESTIONS
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should return the begin state', () => {
    expect(
      reducer(initialState, beginAction)
    ).toEqual({
      movies: [],
      loading: true,
      error: null
    })
  })

  it('should return the success state', () => {
    expect(
      reducer(initialState, successAction)
    ).toEqual({
      movies: PAYLOAD,
      loading: false,
      error: null
    })
  })

  it('should return the failure state', () => {
    expect(
      reducer(initialState, failureAction)
    ).toEqual({
      movies: [],
      loading: false,
      error: REDUCER_ERROR
    })
  })

  it('should return the reset state', () => {
    expect(
      reducer(initialState, resetAction)
    ).toEqual({
      movies: [],
      loading: false,
      error: null
    })
  })
})
