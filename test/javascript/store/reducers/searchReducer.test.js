import * as types from '@store/types/searchTypes'
import reducer from '@store/reducers/searchReducer'

describe('searchReducer', () => {
  const initialState = {
    genres: [],
    movies: [],
    people: [],
    loading: false,
    error: null
  }

  const PAYLOAD = {
    genres: ['Comedy'],
    movies: [
      { title: 'Trainwreck' },
      { title: 'Borat' },
      { title: 'Deadpool' }
    ],
    people: [
      'Amy Schumer',
      'Sacha Baron Cohen',
      'Ryan Reynolds'
    ]
  }

  const REDUCER_ERROR = new Error('Failure in searchReducer')

  const beginAction = {
    type: types.FETCH_SEARCH_RESULTS_BEGIN
  }

  const successAction = {
    type: types.FETCH_SEARCH_RESULTS_SUCCESS,
    payload: { searchResults: PAYLOAD }
  }

  const failureAction = {
    type: types.FETCH_SEARCH_RESULTS_FAILURE,
    payload: { error: REDUCER_ERROR }
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should return the begin state', () => {
    expect(
      reducer(initialState, beginAction)
    ).toEqual({
      genres: [],
      movies: [],
      people: [],
      loading: true,
      error: null
    })
  })

  it('should return the success state', () => {
    expect(
      reducer(initialState, successAction)
    ).toEqual({
      genres: PAYLOAD.genres,
      movies: PAYLOAD.movies,
      people: PAYLOAD.people,
      loading: false,
      error: null
    })
  })

  it('should return the failure state', () => {
    expect(
      reducer(initialState, failureAction)
    ).toEqual({
      genres: [],
      movies: [],
      people: [],
      loading: false,
      error: REDUCER_ERROR
    })
  })
})
