import {BrowserRouter, Routes, Route} from 'react-router' // Perbaikan: gunakan react-router-dom
import '@/styles/App.css'
import Layout from '@/layouts/Index.tsx'
import Splash from '@/views/Splash.tsx'
import Menu from '@/views/Menu'

function App() {
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
