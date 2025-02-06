export interface GlobalContextType {
  isDarkMode: boolean
  toggleTheme: () => void
  colors: {
    text: string
    primary: string
    secondary: string
  }
}

export interface StoreDetailContextType{
  storeDetails: any
}