import Rx from 'rxjs/Rx'
import { Record, List } from 'immutable'
import { combineEpics } from 'redux-observable'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'

import * as api from './api'

/**
 * Public: Action Types
 */

export const FETCH_EXAMPLE = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_EXAMPLE'
export const FETCH_EXAMPLE_SUCCESS = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_EXAMPLE_SUCCESS'
export const FETCH_EXAMPLE_ERROR = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_EXAMPLE_ERROR'

/**
 * Private: Initial State
 */

const InitialState = new Record({
  phase: INIT,
  exampleThings: List(),
  error: null
})

const toInitialState = (state) => new InitialState({
  ...state,
  exampleThings: List(state.things)
})

/**
 * Public: Reducer
 */

export default function reducer(state = new InitialState(), action = {}) {
  if (!(state instanceof InitialState)) return toInitialState(state)

  switch (action.type) {

    case FETCH_EXAMPLE:
      return state.set('phase', LOADING)

    case FETCH_EXAMPLE_SUCCESS:
      return state
        .set('exampleThings', action.payload.things)
        .set('phase', SUCCESS)

    case FETCH_EXAMPLE_ERROR:
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

export const fetchExample = () => ({
  type: FETCH_EXAMPLE
})

/**
 * Private: Epics
 */

const fetchExampleEpic = (action$) =>
  action$
    .ofType(FETCH_EXAMPLE)
    .mergeMap(api.fetchExample)
    .map((things) => ({
      type: FETCH_EXAMPLE_SUCCESS,
      payload: { things }
    }))
    .catch((error) => Rx.Observable.of({
      type: FETCH_EXAMPLE_ERROR,
      payload: { error }
    }))

/**
 * Public: Export Epics
 */

export const <%= duckName %>Epic = combineEpics(
  fetchExampleEpic
)
