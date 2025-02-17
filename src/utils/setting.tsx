export function saveRemark(remark: string): void {
  return localStorage.setItem(import.meta.env.VITE_COOKIE_KEY + '_remark', remark)
}

export function getRemark(): string | null {
  const key = `${import.meta.env.VITE_COOKIE_KEY}_remark`
  return localStorage.getItem(key)
}
