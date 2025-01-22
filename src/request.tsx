import axios from 'axios'
import {getToken} from '@/utils/token'

// Set base URL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const config = {
  timeout: 10000 // Set timeout for requests (in milliseconds)
}

// Create Axios instance
const _axios = axios.create(config)

// Add request interceptor
_axios.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor
_axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    let data = {}
    let errorTagging = {}
    let string = ''
    let statusCode = 400
    let message = ''

    if (typeof error.response === 'undefined') {
      string = 'There was a network error.'
      statusCode = 400
      message = 'There was a network error.'
    } else {
      const errorDetails = error.response.data.error?.error || ''
      let errorArray = errorDetails

      string = errorArray
      if (typeof errorDetails !== 'string') {
        string = ''
        errorArray = Object.values(errorDetails)
        for (let index = 0; index < errorArray.length; index++) {
          string += errorArray.length > 1 ? `- ${errorArray[index]}\n` : errorArray[index]
        }
      }

      data = error.response.data.error?.data || {}
      statusCode = error.response.data.error?.status_code || 400
      message = error.response.data.error?.message || 'An error occurred.'
      errorTagging = error.response.data.error?.error_tagging || {}
    }

    return Promise.reject({
      statusCode,
      message,
      string,
      data,
      errorTagging
    })
  }
)

export default _axios
