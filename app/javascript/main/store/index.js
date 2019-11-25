// App Redux Store

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers/rootReducer'

const Store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default Store
