import Rx from 'rxjs/Rx'
import { Record, List } from 'immutable'
import { combineEpics } from 'redux-observable'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'
import initialQuotes from '../../constants/quotes'

import * as api from './api'

/**
 * Public: Action Types
 */

export const FETCH_QUOTES = 'quotes/quotes/FETCH_QUOTES'
export const FETCH_QUOTES_SUCCESS = 'quotes/quotes/FETCH_QUOTES_SUCCESS'
export const FETCH_QUOTES_ERROR = 'quotes/quotes/FETCH_QUOTES_ERROR'

/**
 * Private: Initial State
 */

const InitialState = new Record({
  phase: INIT,
  quotes: List(initialQuotes),
  error: null
})

const toInitialState = (state) => new InitialState({
  ...state,
  quotes: List(state.quotes)
})

/**
 * Public: Reducer
 */

export default function reducer(state = new InitialState(), action = {}) {
  if (!(state instanceof InitialState)) return toInitialState(state)

  switch (action.type) {

    case FETCH_QUOTES:
      return state.set('phase', LOADING)

    case FETCH_QUOTES_SUCCESS:
      return state
        .set('quotes', action.payload.quotes)
        .set('phase', SUCCESS)

    case FETCH_QUOTES_ERROR:
      return state
        .set('error', action.payload.error)
        .set('phase', ERROR)

    default: {
      return state
    }

  }
}

/**
 * Public: Action Creators
 */

export const fetchQuotes = () => ({
  type: FETCH_QUOTES
})

/**
 * Private: Epics
 */

const fetchQuotesEpic = (action$) =>
  action$
    .ofType(FETCH_QUOTES)
    .mergeMap(api.fetchExample)
    .map((quotes) => ({
      type: FETCH_QUOTES_SUCCESS,
      payload: { quotes }
    }))
    .catch((error) => Rx.Observable.of({
      type: FETCH_QUOTES_ERROR,
      payload: { error }
    }))

/**
 * Public: Export Epics
 */

export const quotesEpic = combineEpics(
  fetchQuotesEpic
)
