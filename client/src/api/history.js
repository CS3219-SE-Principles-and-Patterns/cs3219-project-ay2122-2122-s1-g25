import { GETRequest } from '../config/axios'

export const getAllSessions = (userId) => {
  return GETRequest(`/interview`, { userId })
}

export const getSession = (sessionId) => {
  return GETRequest(`/interview/${sessionId}`)
}

export const getPartner = (userId) => {
  return GETRequest(`/users/${userId}`)
}
