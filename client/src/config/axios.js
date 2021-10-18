import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`,
  timeout: 5000,
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

export const POSTLongRequest = (url, data = {}) => {
  return longInstance.post(url, data)
}
