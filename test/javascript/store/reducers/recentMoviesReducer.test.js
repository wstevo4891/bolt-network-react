import * as types from 'main/store/types/recentMoviesTypes'
import reducer from 'main/store/reducers/recentMoviesReducer'

describe('recentMoviesReducer', () => {
  const initialState = {
    movies: [],
    loading: false,
    error: null
  }

  const PAYLOAD = [
    { title: 'Trainwreck' },
    { title: 'Blade Runner 2049' },
    { title: 'Coco' }
  ]

  const REDUCER_ERROR = new Error('Failure in recentMoviesReducer')

  const beginAction = {
    type: types.FETCH_RECENT_MOVIES_BEGIN
  }

  const successAction = {
    type: types.FETCH_RECENT_MOVIES_SUCCESS,
    payload: { movies: PAYLOAD }
  }

  const failureAction = {
    type: types.FETCH_RECENT_MOVIES_FAILURE,
    payload: { error: REDUCER_ERROR }
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
})
