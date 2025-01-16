import { BrowserRouter, Routes, Route } from "react-router";
import '@/styles/App.css'
import Home from '@/views/Home.tsx'

function App() {
  return (
    <>
      <div>
        asdasdasd
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
