import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import BusinessClients from './pages/BusinessClients'
import About from './pages/About'
import Contact from './pages/Contact'
import Upload from './pages/Upload'
import Track from './pages/Track'
import Admin from './pages/Admin'

// Admin page uses its own full-screen layout (no Navbar/Footer)
function Layout() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  if (isAdmin) return <Admin />

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/business-clients" element={<BusinessClients />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/track" element={<Track />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
