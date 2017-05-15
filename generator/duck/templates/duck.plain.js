import { Record } from 'immutable'

/**
 * Public: Action Types
 */

// Action types go here
// Example:
// export const ACTION_NAME = '<%= projectActionPrefix %>/<%= duckName %>/ACTION_NAME'

/**
 * Private: Initial State
 */

const InitialState = new Record({
  // State properties go here
})

const toInitialState = (state) => new InitialState({
  ...state
})

/**
 * Public: Reducer
 */

export default function reducer(state = new InitialState(), action = {}) {
  if (!(state instanceof InitialState)) return toInitialState(state)

  switch (action.type) {

    default: {
      return state
    }

  }
}

/**
 * Public: Action Creators
 */

// Action types go here
// Example:
// export const doSomething = (payload) => ({
//   type: DO_SOMETHING,
//   payload
// })
