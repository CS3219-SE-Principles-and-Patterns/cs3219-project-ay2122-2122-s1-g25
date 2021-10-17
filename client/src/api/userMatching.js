import { POSTLongRequest, DELETERequest } from '../config/axios'

export const createUserMatching = (data) => {
  return POSTLongRequest('/matching', data)
}

export const deleteUserMatching = (userId) => {
  return DELETERequest(`/matching/${userId}`)
}
