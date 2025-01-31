import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {GlobalProvider} from '@/contexts/GlobalContext'
import '@/styles/normalize.css'
import App from './App'
import '@/i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
)
