import { Record, List } from 'immutable'

import reducer, {
  fetchExample,
  FETCH_EXAMPLE,
  FETCH_EXAMPLE_SUCCESS,
  FETCH_EXAMPLE_ERROR
} from '../duck'
import * as phases from '../../../constants/phase'

describe('<%= duckName %> actions', () => {
  it('creates an action to fetch things', () => {
    const expectedAction = {
      type: FETCH_EXAMPLE
    }
    expect(fetchExample()).toEqual(expectedAction)
  })
})

describe('<%= duckName %> reducer', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, {})
    expect(state).toBeInstanceOf(Record)
    expect(state.phase).toBe(phases.INIT)
    expect(state.exampleThings).toBeInstanceOf(List)
    expect(state.error).toBe(null)
  })

  it('handles a fetch things action', () => {
    const fetchExampleAction = {
      type: FETCH_EXAMPLE
    }
    const state = reducer(undefined, fetchExampleAction)
    expect(state.phase).toBe(phases.LOADING)
  })

  it('handles a fetch things success action', () => {
    const things = List([
      { id: 1, title: 'The Title', description: 'A description' },
      { id: 2, title: 'Another Title', description: 'Another description' },
      { id: 3, title: 'One More Title', description: 'One More description' }
    ])
    const fetchExampleSuccessAction = {
      type: FETCH_EXAMPLE_SUCCESS,
      payload: { things }
    }
    const state = reducer(undefined, fetchExampleSuccessAction)
    expect(state.phase).toEqual(phases.SUCCESS)
    expect(state.exampleThings).toBe(things)
    expect(state.error).toEqual(null)
  })

  it('handles a fetch things error action', () => {
    const error = new Error('Something blew up')
    const fetchExampleErrorAction = {
      type: FETCH_EXAMPLE_ERROR,
      payload: { error }
    }
    const state = reducer(undefined, fetchExampleErrorAction)
    expect(state.phase).toEqual(phases.ERROR)
    expect(state.exampleThings).toBeInstanceOf(List)
    expect(state.error).toEqual(error)
  })
})
