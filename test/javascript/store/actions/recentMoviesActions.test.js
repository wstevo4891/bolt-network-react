import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from '@store/actions/recentMoviesActions'
import * as types from '@store/types/recentMoviesTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('recentMoviesActions', () => {
  const PAYLOAD = [
    { title: 'Trainwreck' },
    { title: 'Blade Runner 2049' },
    { title: 'Coco' }
  ]

  const recentMoviesError = new Error('Failure in fetchRecentMovies()')

  const beginAction = {
    type: types.FETCH_RECENT_MOVIES_BEGIN
  }

  const successAction = {
    type: types.FETCH_RECENT_MOVIES_SUCCESS,
    payload: { movies: PAYLOAD }
  }

  const failureAction = {
    type: types.FETCH_RECENT_MOVIES_FAILURE,
    payload: { error: recentMoviesError }
  }

  it('should create an action to begin fetch', () => {
    expect(actions.fetchRecentMoviesBegin()).toEqual(beginAction)
  })

  it('should create an action for a successful fetch', () => {
    expect(
      actions.fetchRecentMoviesSuccess(PAYLOAD)
    ).toEqual(successAction)
  })

  it('should create an action for a failed fetch', () => {
    expect(
      actions.fetchRecentMoviesFailure(recentMoviesError)
    ).toEqual(failureAction)
  })

  describe('async actions', () => {
    afterEach(() => fetchMock.restore())

    it('creates FETCH_RECENT_MOVIES_SUCCESS when fetch is done', () => {
      fetchMock.getOnce(actions.URI, PAYLOAD)

      const expectedActions = [
        beginAction,
        successAction
      ]

      const store = mockStore({
        movies: []
      })

      return store.dispatch(actions.fetchRecentMovies()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates FETCH_RECENT_MOVIES_FAILURE when fetch throws an error', () => {
      fetchMock.getOnce(actions.URI, { throws: recentMoviesError })

      const expectedActions = [
        beginAction,
        failureAction
      ]

      const store = mockStore({
        movies: []
      })

      return store.dispatch(actions.fetchRecentMovies()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})

