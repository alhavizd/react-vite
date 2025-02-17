export function saveCart(cart: Record<string, any>): void {
  localStorage.setItem(import.meta.env.VITE_COOKIE_KEY + '_cart', JSON.stringify(cart))
}
