import Cookies from 'js-cookie'

const TokenKey = import.meta.env.VITE_COOKIE_KEY + '_AD'
const OTPKey = import.meta.env.VITE_COOKIE_KEY + '_OTP'

export function getToken() {
  return Cookies.getJSON(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {expires: 1})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getOTP() {
  return Cookies.getJSON(OTPKey)
}

export function setOTP(otp) {
  return Cookies.set(OTPKey, otp, {expires: 1})
}

export function removeOTP() {
  return Cookies.remove(OTPKey)
}
