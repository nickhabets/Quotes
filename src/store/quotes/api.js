import { List } from 'immutable'

import { readRamdomQuotes } from '../sqlite'
const { API_HOSTNAME } = process.env

export const fetchRandomQuotes = () => {
  return readRamdomQuotes(3)
}
