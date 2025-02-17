import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {GlobalProvider} from '@/contexts/GlobalContext'
import {StoreDetailProvider} from '@/contexts/StoreDetailContext'
import {OutletProvider} from '@/contexts/OutletContext'
import '@/styles/normalize.css'
import App from './App'
import '@/i18n'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <StoreDetailProvider>
          <OutletProvider>
            <App />
          </OutletProvider>
        </StoreDetailProvider>
      </GlobalProvider>
    </QueryClientProvider>
  </StrictMode>
)
