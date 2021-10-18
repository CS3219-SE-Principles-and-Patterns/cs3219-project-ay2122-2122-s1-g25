import { POSTRequest } from '../config/axios'

export const createFeedback = (data) => {
  return POSTRequest('/feedback', data)
}
