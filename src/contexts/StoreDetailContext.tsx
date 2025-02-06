import React, {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import {getStore} from '@/services/outlet'
import {StoreDetailContextType} from '@/types/global'

// Context untuk data toko
const StoreDetailContext = createContext<StoreDetailContextType | undefined>(undefined)

// Provider untuk membungkus aplikasi
export const StoreDetailProvider = ({children}: {children: React.ReactNode}) => {
  const [storeDetails, setStoreDetails] = useState<any>(null)

  // Query store detail, hanya berjalan setelah login berhasil (token ada)
  const {
    data: storeDetail,
    isLoading: isStoreLoading,
    error: isStoreError
  } = useQuery({
    queryKey: ['storeDetail'],
    queryFn: getStore
  })

  useEffect(() => {
    if (storeDetail?.data) {
      setStoreDetails(storeDetail.data.data)
    }
  }, [storeDetail])

  if (isStoreLoading) return <p>Loading...</p>
  if (isStoreError) return <p>Error: Gagal mendapatkan data</p>

  return <StoreDetailContext.Provider value={{storeDetails}}>{children}</StoreDetailContext.Provider>
}

// Hook untuk menggunakan data toko
export const useStoreDetail = () => {
  const context = useContext(StoreDetailContext)
  if (context === undefined) {
    throw new Error('useStoreDetail harus digunakan dalam StoreDetailProvider')
  }
  return context
}
