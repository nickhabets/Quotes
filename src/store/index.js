/**
 * Created by Sasa on 5/15/17.
 */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import quotes, { quotesEpic } from './quotes/duck'

// Epics
const epics = combineEpics(
  quotesEpic
)

// Define Middleware
const middleware = [
  thunk,
  promise(),
  createEpicMiddleware(epics)
]

// Define Reducers
const reducers = combineReducers({
  quotes
})

// Create Store
export default createStore(reducers, {}, applyMiddleware(...middleware))
