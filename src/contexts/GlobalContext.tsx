import React, { createContext, useContext, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { addSeconds } from 'date-fns'
import { login } from '@/services/auth'
import { setToken } from '@/utils/token'
import { GlobalContextType } from '@/types/global'

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(import.meta.env.VITE_COOKIE_KEY + '_theme')
    return savedTheme === 'dark'
  })

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem(import.meta.env.VITE_COOKIE_KEY + '_theme', newMode ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light')
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const colors = isDarkMode
    ? { primary: '#0d6efd', secondary: '#adb5bd', text: '#f8f9fa' }
    : { primary: '#007bff', secondary: '#6c757d', text: '#000' }

  const { data: token, isLoading, error } = useQuery({
    queryKey: ['token'],
    queryFn: login,
    enabled: !localStorage.getItem(import.meta.env.VITE_COOKIE_KEY + '_auth_data')
  })

  useEffect(() => {
    if (token?.access_token) {
      const expiry = addSeconds(new Date(), token.expires_in || 0)
      setToken(token.access_token)
      localStorage.setItem(
        import.meta.env.VITE_COOKIE_KEY + '_auth_data',
        JSON.stringify({ ...token, expires_time: expiry })
      )
    }
  }, [token])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: Gagal mendapatkan data</p>

  return (
    <GlobalContext.Provider value={{ toggleTheme, colors, isDarkMode }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => {
  const context = useContext(GlobalContext)
  if (!context) throw new Error('useGlobal harus digunakan dalam GlobalProvider')
  return context
}
