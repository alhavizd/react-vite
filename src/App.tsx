import {BrowserRouter, Routes, Route} from 'react-router' // Perbaikan: gunakan react-router-dom
import '@/styles/App.css'
import Layout from '@/layouts/Index'
import Splash from '@/views/Splash'
import Menu from '@/views/Menu'

const App: React.FC = () => {
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
