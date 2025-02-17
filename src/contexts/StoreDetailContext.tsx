import React, {createContext, useContext} from 'react'
import {useQuery} from '@tanstack/react-query'
import {getStore} from '@/services/outlet'
import {StoreDetailContextType} from '@/types/global'

// Context untuk data toko
const StoreDetailContext = createContext<StoreDetailContextType | undefined>(undefined)

// Provider untuk membungkus aplikasi
export const StoreDetailProvider = ({children}: {children: React.ReactNode}) => {
  // Query store detail, hanya berjalan setelah login berhasil (token ada)
  const {
    data: dataStoreDetail,
    isLoading: isStoreLoading,
    error: isStoreError
  } = useQuery({
    queryKey: ['storeDetail'],
    queryFn: getStore
  })

  let storeDetail = {}

  if (dataStoreDetail) {
    storeDetail = dataStoreDetail.data
    localStorage.setItem(import.meta.env.VITE_COOKIE_KEY + '_outlet_id', String(dataStoreDetail.data.id))
  }

  if (isStoreLoading) return <p>Loading...</p>
  if (isStoreError) return <p>Error: Gagal mendapatkan data 3</p>

  return <StoreDetailContext.Provider value={{storeDetail}}>{children}</StoreDetailContext.Provider>
}

// Hook untuk menggunakan data toko
export const useStoreDetail = () => {
  const context = useContext(StoreDetailContext)
  if (context === undefined) {
    throw new Error('useStoreDetail harus digunakan dalam StoreDetailProvider')
  }
  return context
}
