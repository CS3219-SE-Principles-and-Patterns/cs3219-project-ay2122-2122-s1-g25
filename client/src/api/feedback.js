import { GETRequest, POSTRequest } from '../config/axios'

export const createFeedback = (data) => {
  return POSTRequest('/feedback', data)
}

export const getFeedbacks = (userId) => {
  return GETRequest(`/feedback`, { userId })
}
