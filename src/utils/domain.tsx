const LocaleKey: string = (import.meta.env.VITE_COOKIE_KEY as string) + '_url_store'

export function getDomain(): string | null {
  return localStorage.getItem(LocaleKey)
}

export function setDomain(url: string): void {
  localStorage.setItem(LocaleKey, url)
}

export function removeDomain(): void {
  localStorage.removeItem(LocaleKey)
}
