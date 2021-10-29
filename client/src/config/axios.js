import axios from 'axios'
import firebase from './firebase'

const injectJWTToken = (config) => {
  const user = firebase.auth().currentUser
  if (user) {
    user
      .getIdToken()
      .then((token) => {
        config.headers.Authorization = `Bearer ${token}`
        return config
      })
      .catch((err) => err)
  }
  return config
}

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`,
  timeout: 5000,
})

instance.interceptors.request.use((config) => {
  return injectJWTToken(config)
})

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

longInstance.interceptors.request.use((config) => {
  return injectJWTToken(config)
})

export const POSTLongRequest = (url, data = {}) => {
  return longInstance.post(url, data)
}
