import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 5000,
})

export const GETRequest = (url, params = {}) => {
  return instance.get(url, { params })
}

export const POSTRequest = (url, data = {}) => {
  return instance.post(url, data)
}
