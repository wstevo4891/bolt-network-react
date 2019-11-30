// Banner Movies Reducer

import {
  FETCH_BANNER_MOVIES_BEGIN,
  FETCH_BANNER_MOVIES_SUCCESS,
  FETCH_BANNER_MOVIES_FAILURE
} from '../types/bannerMoviesTypes'

const initialState = {
  movies: [],
  loading: false,
  error: null
}

export default function bannerMoviesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BANNER_MOVIES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_BANNER_MOVIES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        movies: action.payload.movies,
        loading: false
      }

    case FETCH_BANNER_MOVIES_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        movies: [],
        loading: false,
        error: action.payload.error
      }

    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
