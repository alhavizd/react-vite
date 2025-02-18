import React, {createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'
import i18n from 'i18next'
import {useQuery} from '@tanstack/react-query'
import {addSeconds} from 'date-fns'
import {login} from '@/services/auth'
import {setToken} from '@/utils/token'
import {getDomain, setDomain} from '@/utils/domain'
import {GlobalContextType} from '@/types/global'

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
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

  const colors = isDarkMode ? {primary: '#0d6efd', secondary: '#adb5bd', text: '#f8f9fa'} : {primary: '#007bff', secondary: '#6c757d', text: '#000'}

  // Menjalankan checkStore saat pertama kali aplikasi dimuat
  useEffect(() => {
    const checkStore = async () => {
      if (!getDomain()) {
        const isDevelopment = import.meta.env.VITE_NODE_ENV === 'development'
        const host = window.location.hostname
        let url_store = 'jakartatest'

        if (isDevelopment) {
          url_store = 'jakartatest'
          return setDomain(url_store)
        }
        if (host.includes('antarinmakan.com') || host.includes('indociti.com')) {
          url_store = host.includes('indociti.com') ? 'jakartatest' : host.split('.')[0] || 'jakartatest'
          return setDomain(url_store)
        }
        if (!host.includes('antarinmakan.com') && !host.includes('indociti.com')) {
          try {
            const hostname = window.location.hostname
            const selectedLocale = i18n.language || import.meta.env.VITE_I18N_LOCALE
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}${selectedLocale}/hintstore`, {domain: hostname})
            url_store = data.data.url_id
            return setDomain(url_store)
          } catch {
            url_store = 'jakartatest'
            return setDomain(url_store)
          }
        }
        url_store = host.split('.').length > 2 ? host.split('.')[0] : 'jakartatest'
        return setDomain(url_store)
      }
    }

    checkStore() // panggil langsung di sini
  }, [])

  const {
    data: token,
    isLoading,
    error
  } = useQuery({
    queryKey: ['token'],
    queryFn: login,
    enabled: !localStorage.getItem(import.meta.env.VITE_COOKIE_KEY + '_auth_data')
  })

  useEffect(() => {
    if (token?.access_token) {
      const expiry = addSeconds(new Date(), token.expires_in || 0)
      setToken(token.access_token)
      localStorage.setItem(import.meta.env.VITE_COOKIE_KEY + '_auth_data', JSON.stringify({...token, expires_time: expiry}))
    }
  }, [token])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: Gagal mendapatkan data</p>

  return <GlobalContext.Provider value={{toggleTheme, colors, isDarkMode}}>{children}</GlobalContext.Provider>
}

export const useGlobal = () => {
  const context = useContext(GlobalContext)
  if (!context) throw new Error('useGlobal harus digunakan dalam GlobalProvider')
  return context
}
