// Reducer Helpers

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers[action.type]) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export function MoviesState(params = {}) {
  this.movies = params.movies || []
  this.loading = params.loading || false
  this.error = params.error || null
}
