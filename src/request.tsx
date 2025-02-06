import axios, {AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig} from 'axios'
import {setToken, getToken} from '@/utils/token'
import {addSeconds, subMinutes} from 'date-fns'
import {getDomain} from '@/utils/domain'

interface ErrorResponse {
  error?: {
    error?: string | Record<string, string>
    data?: any
    status_code?: number
    message?: string
    error_tagging?: Record<string, any>
  }
}

// Extend AxiosRequestConfig to include `_retry` flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

// Set base URL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const config: AxiosRequestConfig = {
  timeout: 10000 // Set timeout for requests (in milliseconds)
}

// Create Axios instance
const _axios = axios.create(config)

// Add request interceptor
_axios.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Add response interceptor
_axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponse>) => {
    let data = {}
    let errorTagging: Record<string, any> = {}
    let string = ''
    let statusCode = 400
    let message = ''

    if (!error.response) {
      string = 'There was a network error.'
      message = 'There was a network error.'
    } else {
      const errorDetails = error.response.data?.error?.error || ''
      const errorArray = typeof errorDetails === 'string' ? [errorDetails] : Object.values(errorDetails)
      string = errorArray.join('\n')
      data = error.response.data?.error?.data || {}
      statusCode = error.response.data?.error?.status_code || 400
      message = error.response.data?.error?.message || 'An error occurred.'
      errorTagging = error.response.data?.error?.error_tagging || {}
    }

    // Handle token expiration and refresh logic
    const authData = localStorage.getItem(import.meta.env.VITE_COOKIE_KEY + '_auth_data')
    let tokenExpiryDate: number | null = null
    let tenMinutesBeforeExpiry = 0
    const now = Date.now()

    if (authData) {
      try {
        const objAuth = JSON.parse(authData)
        if (objAuth.expires_time) {
          tokenExpiryDate = Date.parse(objAuth.expires_time)
          tenMinutesBeforeExpiry = subMinutes(tokenExpiryDate, 30).getTime()
        }

        if (statusCode === 401 && (!tokenExpiryDate || now > tenMinutesBeforeExpiry)) {
          if (objAuth.auth_by === 'BASIC' || objAuth.auth_by === 'SYSTEM') {
            console.log('test')

            if (objAuth.refresh_token) {
              const originalRequest = error.config as CustomAxiosRequestConfig
              if (originalRequest._retry) {
                return Promise.reject({statusCode, message, string, data, errorTagging})
              }
              originalRequest._retry = true

              try {
                const headers = {Authorization: `Bearer ${getToken()}`}
                const dataAuth = {
                  client_id: import.meta.env.VITE_APP_CLIENT_ID,
                  client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
                  grant_type: 'refresh_token',
                  refresh_token: objAuth.refresh_token,
                  scope: ''
                }

                const url_domain: string = getDomain() ?? 'jakartatest'
                const res = await _axios.post('/' + url_domain + '/customer/auth/refreshtoken', dataAuth, {headers})
                const tokensExpiry = addSeconds(new Date(), res.data.expires_in)
                res.data.expires_time = tokensExpiry.toISOString()

                setToken(res.data.access_token)
                localStorage.setItem(import.meta.env.VITE_COOKIE_KEY + '_auth_data', JSON.stringify(res.data))

                originalRequest.headers['Authorization'] = `Bearer ${res.data.access_token}`
                return _axios(originalRequest)
              } catch {
                return Promise.reject({
                  statusCode,
                  message,
                  string,
                  data,
                  isRefreshToken: 1
                })
              }
            } else {
              console.log('No refresh token available.')
            }
          } else {
            console.log('Session expired, reloading page...')
            location.reload()
          }
        }
      } catch (e) {
        console.error('Failed to parse auth data:', e)
      }
    }

    return Promise.reject({statusCode, message, string, data, errorTagging})
  }
)

export default _axios
