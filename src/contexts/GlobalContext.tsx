import React, {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import {addSeconds} from 'date-fns'
import {checkStore} from '@/middleware/checkStore'
import {login} from '@/services/auth'
import {setToken} from '@/utils/token'
import {GlobalContextType} from '@/types/global'

// Context untuk data toko
const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

// Provider untuk membungkus aplikasi
export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [authData, setAuthData] = useState<string | null>(localStorage.getItem(import.meta.env.VITE_COOKIE_KEY + '_auth_data'))

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev
      localStorage.setItem(import.meta.env.VITE_COOKIE_KEY + '_theme', newMode ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light')
      return newMode
    })
  }

  const colors = isDarkMode
    ? {
        primary: '#0d6efd', // Warna utama untuk mode gelap
        secondary: '#adb5bd', // Warna sekunder untuk mode gelap
        text: '#f8f9fa'
      }
    : {
        primary: '#007bff', // Warna utama untuk mode terang
        secondary: '#6c757d', // Warna sekunder untuk mode terang
        text: '#000'
      }

  useEffect(() => {
    const savedTheme = localStorage.getItem(import.meta.env.VITE_COOKIE_KEY + '_theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.setAttribute('data-theme', 'light')
    }

    // Pastikan checkStore dipanggil untuk mengambil domain pertama
    checkStore()
  }, [])

  // Query token dan store details
  const {
    data: token,
    isLoading: isLoginLoading,
    error
  } = useQuery({
    queryKey: ['token'],
    queryFn: login,
    enabled: !authData // Fetch token hanya jika authData belum ada
  })

  useEffect(() => {
    if (token?.data?.access_token) {
      const tokensExpiry: Date = addSeconds(new Date(), token.data.expires_in ?? 0)
      token.data.expires_time = tokensExpiry
      setToken(token.data.access_token)
      delete token.data.access_token

      const tokenString = JSON.stringify(token.data ?? {})
      localStorage.setItem(import.meta.env.VITE_COOKIE_KEY + '_auth_data', tokenString)
      setAuthData(tokenString) // Update state untuk trigger re-render
    }
  }, [token])

  if (isLoginLoading) return <p>Loading...</p>
  if (error) return <p>Error: Gagal mendapatkan data</p>

  return <GlobalContext.Provider value={{toggleTheme, colors, isDarkMode}}>{children}</GlobalContext.Provider>
}

// Hook untuk menggunakan data toko
export const useGlobal = () => {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('useGlobal harus digunakan dalam GlobalProvider')
  }
  return context
}
