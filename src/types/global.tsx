export interface GlobalContextType {
  isDarkMode: boolean
  toggleTheme: () => void
  colors: {
    text: string
    primary: string
    secondary: string
  }
}

export interface StoreDetailContextType {
  storeDetail: any
}

export interface OutletContextType {
  selectOutletId: (id: number) => void
  outletDetail: any
}
