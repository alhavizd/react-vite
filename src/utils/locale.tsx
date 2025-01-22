import Cookies from 'js-cookie'

const LocaleKey: string = import.meta.env.VITE_COOKIE_KEY + '_Locale'

export function getLocale(): string | undefined {
  return Cookies.get(LocaleKey)
}

export function setLocale(locale: string): string | undefined {
  return Cookies.set(LocaleKey, locale, {expires: 1})
}

export function removeLocale(): void {
  return Cookies.remove(LocaleKey)
}
