import axios from 'axios'
import { ERROR } from '../utils/message'
import firebase from './firebase'

const getJWTToken = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .getIdToken()
          .then((token) => {
            resolve(token)
          })
          .catch((err) => reject(err))
      } else {
        reject(ERROR.userNotFound)
      }
    })
  })
}

const injectJWTToken = async (request) => {
  try {
    const token = await getJWTToken()
    request.headers.Authorization = `Bearer ${token}`
  } catch (err) {
    console.error(err)
  }
  return request
}

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`,
  timeout: 5000,
})

instance.interceptors.request.use(injectJWTToken)

export const GETRequest = (url, params = {}) => {
  return instance.get(url, { params })
}

export const POSTRequest = (url, data = {}) => {
  return instance.post(url, data)
}

export const PUTRequest = (url, data = {}) => {
  return instance.put(url, data)
}

export const DELETERequest = (url, params = {}) => {
  return instance.delete(url, { params })
}

// A longer timeout needed for user matching -> not sure if this is ok
const longInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`,
  timeout: 40000,
})

longInstance.interceptors.request.use(injectJWTToken)

export const POSTLongRequest = (url, data = {}) => {
  return longInstance.post(url, data)
}
