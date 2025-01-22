const LocaleKey = import.meta.env.VITE_COOKIE_KEY + '_url_store'

export function getDomain() {
  return localStorage.getItem(LocaleKey)
}

export function setDomain(url) {
  return localStorage.setItem(LocaleKey, url)
}

export function removeDomain() {
  return localStorage.removeItem(LocaleKey)
}
