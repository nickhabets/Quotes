import { Record } from 'immutable'

import reducer from '../duck'

describe('<%= duckName %> reducer', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, {})
    expect(state).toBeInstanceOf(Record)
  })
})
