import {login} from '@/services/auth'
import addSeconds from 'date-fns/addSeconds'
import {setToken} from '@/utils/token'

export async function checkToken() {
  const auth_data = JSON.parse(localStorage.getItem(import.meta.env.VITE_COOKIE_KEY + '_auth_data'))
  if (auth_data === undefined || !auth_data) {
    try {
      const {data} = await login()
      const tokensExpiry = addSeconds(new Date(), data.expires_in)
      data.expires_time = tokensExpiry
      setToken(data.access_token)
      delete data.access_token
      localStorage.setItem(import.meta.env.VITE_COOKIE_KEY + '_auth_data', JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
  }
}
