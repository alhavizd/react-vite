import React, {createContext, useContext, useState, useEffect} from 'react'
import {checkToken} from '@/middleware/checkToken'
import {checkStore} from '@/middleware/checkStore'
import {getStore} from '@/services/outlet'

interface GlobalContextType {
  storeDetails: any // Ganti `any` dengan tipe spesifik jika diketahui
  loading: boolean
  error: string | null
  isDarkMode: boolean
  toggleTheme: () => void
  colors: {
    text: string
    primary: string
    secondary: string
  }
}

// Context untuk data toko
const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

// Provider untuk membungkus aplikasi
export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
  const [storeDetails, setStoreDetails] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

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
        primary: '#0d6efd', // Dark mode primary color
        secondary: '#adb5bd', // Dark mode secondary color
        text: '#f8f9fa'
      }
    : {
        primary: '#007bff', // Light mode primary color
        secondary: '#6c757d', // Light mode secondary color
        text: '#000'
      }

  // Fungsi untuk fetch data toko
  const fetchStoreDetails = async () => {
    try {
      setLoading(true)
      const {data} = await getStore() // Ganti dengan endpoint API Anda
      setStoreDetails(data.data)
    } catch (err) {
      setError('Gagal memuat detail toko')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch data saat pertama kali aplikasi dimuat
  useEffect(() => {
    const savedTheme = localStorage.getItem(import.meta.env.VITE_COOKIE_KEY + '_theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.setAttribute('data-theme', 'light')
    }
    const setupMiddleware = async () => {
      await checkStore()
      await checkToken()
      await fetchStoreDetails()
    }
    setupMiddleware()
  }, [])
  

  return <GlobalContext.Provider value={{storeDetails, loading, error, toggleTheme, colors, isDarkMode}}>{children}</GlobalContext.Provider>
}

// Hook untuk menggunakan data toko
export const useGlobal = () => {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('useGlobal harus digunakan dalam GlobalProvider')
  }
  return context
}
