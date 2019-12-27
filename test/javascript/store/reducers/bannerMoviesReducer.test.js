import * as types from '@store/types/bannerMoviesTypes'
import reducer from '@store/reducers/bannerMoviesReducer'

describe('bannerMoviesReducer', () => {
  const initialState = {
    movies: [],
    loading: false,
    error: null
  }

  const PAYLOAD = [
    { title: 'Pirates of the Caribbean: The Curse of the Black Pearl' },
    { title: 'The Avengers' },
    { title: 'Skyfall' }
  ]

  const REDUCER_ERROR = new Error('Failure in bannerMoviesReducer')

  const beginAction = {
    type: types.FETCH_BANNER_MOVIES_BEGIN
  }

  const successAction = {
    type: types.FETCH_BANNER_MOVIES_SUCCESS,
    payload: { movies: PAYLOAD }
  }

  const failureAction = {
    type: types.FETCH_BANNER_MOVIES_FAILURE,
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
