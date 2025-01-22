import {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router' // Perbaikan: gunakan react-router-dom
import {checkToken} from '@/middleware/checkToken'
import {checkStore} from '@/middleware/checkStore'
import '@/styles/App.css'
import Layout from '@/layouts/Index.tsx'
import Splash from '@/views/Splash.tsx'
import Menu from '@/views/Menu'

function App() {
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
    <>
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
    </>
  )
}

export default App
