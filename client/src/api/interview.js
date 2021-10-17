import { GETRequest } from '../config/axios'

export const getInterview = (iSessionId) => {
  return GETRequest(`/interview/${iSessionId}`)
}
