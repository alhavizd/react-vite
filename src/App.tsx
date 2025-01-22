import {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router' // Perbaikan: gunakan react-router-dom
import {checkToken} from '@/middleware/checkToken.tsx'
import {checkStore} from '@/middleware/checkStore.tsx'
import '@/styles/App.css'
import Layout from '@/layouts/Index.tsx'
import Splash from '@/views/Splash.tsx'
import Menu from '@/views/Menu'

const App: React.FC = () => {
  // Menambahkan tipe React.FC untuk fungsi komponen
  useEffect(() => {
    const setupMiddleware = async () => {
      try {
        await checkStore()
        await checkToken()
      } catch (e) {
        console.log(e)
      }
    }

    setupMiddleware()
  }, [])

  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route element={<Layout />}>
            <Route path="/menu" element={<Menu />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
