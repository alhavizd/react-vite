import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '@/styles/normalize.css'
import App from './App'
import '@/i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
