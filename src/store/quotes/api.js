import { List } from 'immutable'

const { API_HOSTNAME } = process.env

export const fetchExample = () => {
  return fetch(`http://${API_HOSTNAME}/example`)
    .then((res) => res.json())
    .then((payload) => List(payload))
}
