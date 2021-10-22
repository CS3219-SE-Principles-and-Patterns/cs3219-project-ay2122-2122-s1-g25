import { GETRequest, PUTRequest } from '../config/axios'

export const getInterview = (iSessionId) => {
  return GETRequest(`/interview/${iSessionId}`)
}

export const updateInterviewRotation = (iSessionId, data) => {
  return PUTRequest(`/interview/updateRotation/${iSessionId}`, data)
}

export const updateInterviewCompletion = (iSessionId, data) => {
  return PUTRequest(`/interview/updateCompletion/${iSessionId}`, data)
}

export const updateCode = (iSessionId, data) => {
  return PUTRequest(`/rotation/${iSessionId}`, data)
}
