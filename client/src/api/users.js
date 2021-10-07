import { GETRequest, POSTRequest } from '../config/axios'

export const getUser = (userId) => {
  return GETRequest(`/users/${userId}`)
}

export const createUser = (data) => {
  return POSTRequest('/users', data)
}
