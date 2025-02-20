import Cookies from 'js-cookie'

const TokenKey: string = import.meta.env.VITE_COOKIE_KEY + '_AD'
const OTPKey: string = import.meta.env.VITE_COOKIE_KEY + '_OTP'

export function getToken(): string | undefined {
  const token = Cookies.get(TokenKey)
  return token || undefined
}

export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token, {expires: 1})
}

export function removeToken(): void {
  return Cookies.remove(TokenKey)
}

export function getOTP<T>(): T | undefined {
  const otp = Cookies.get(OTPKey)
  return otp ? JSON.parse(otp) : undefined
}

export function setOTP(otp: object): string | undefined {
  return Cookies.set(OTPKey, JSON.stringify(otp), {expires: 1})
}

export function removeOTP(): void {
  return Cookies.remove(OTPKey)
}
