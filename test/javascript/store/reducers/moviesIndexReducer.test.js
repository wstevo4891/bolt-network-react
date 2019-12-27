import * as types from '@store/types/moviesIndexTypes'
import reducer from '@store/reducers/moviesIndexReducer'

describe('movies index reducer', () => {
  const initialState = {
    moviesIndex: {},
    genres: [],
    genresIndex: {},
    loading: false,
    error: null
  }

  const PAYLOAD = {
    Action: [{ title: 'The Avengers' }],
    'Sci-Fi': [{ title: 'Alien' }]
  }

  const moviesIndexError = new Error('Failure in fetchMoviesIndex()')

  const beginAction = {
    type: types.FETCH_MOVIES_INDEX_BEGIN
  }

  const successAction = {
    type: types.FETCH_MOVIES_INDEX_SUCCESS,
    payload: { moviesIndex: PAYLOAD }
  }

  const failureAction = {
    type: types.FETCH_MOVIES_INDEX_FAILURE,
    payload: { error: moviesIndexError }
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should return the begin state', () => {
    expect(
      reducer(initialState, beginAction)
    ).toEqual({
      moviesIndex: {},
      genres: [],
      genresIndex: {},
      loading: true,
      error: null
    })
  })

  it('should return the success state', () => {
    expect(
      reducer(initialState, successAction)
    ).toEqual({
      moviesIndex: PAYLOAD,
      genres: ['Action', 'Sci-Fi'],
      genresIndex: {
        action: { text: 'Action', url: '/genres/action' },
        'sci-fi': { text: 'Sci-Fi', url: '/genres/sci-fi' }
      },
      loading: false,
      error: null
    })
  })

  it('should return the failure state', () => {
    expect(
      reducer(initialState, failureAction)
    ).toEqual({
      moviesIndex: {},
      genres: [],
      genresIndex: {},
      loading: false,
      error: moviesIndexError
    })
  })
})
