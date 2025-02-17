import React, {createContext, useContext} from 'react'
import {useQuery} from '@tanstack/react-query'
import {getDetail as getDetailOutlet} from '@/services/outlet'
import {useStoreDetail} from '@/contexts/StoreDetailContext'
import {OutletContextType} from '@/types/global'

const OutletContext = createContext<OutletContextType | undefined>(undefined)

export const OutletProvider = ({children}: {children: React.ReactNode}) => {
  const {storeDetail} = useStoreDetail()
  const outletId = Number(localStorage.getItem(import.meta.env.VITE_COOKIE_KEY + '_outlet_id'))

  const {data, isLoading, error} = useQuery({
    queryKey: ['outlet', outletId],
    queryFn: () => getDetailOutlet(outletId),
    enabled: !!outletId
  })

  const outletDetail = data?.data || storeDetail

  const selectOutletId = (id: number) => {
    localStorage.setItem(import.meta.env.VITE_COOKIE_KEY + '_outlet_id', String(id))
    return id
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: Gagal mendapatkan data outlet</p>

  return <OutletContext.Provider value={{selectOutletId, outletDetail}}>{children}</OutletContext.Provider>
}

export const useOutlet = () => {
  const context = useContext(OutletContext)
  if (!context) throw new Error('useOutlet harus digunakan dalam OutletProvider')
  return context
}
