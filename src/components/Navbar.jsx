import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Business Clients', to: '/business-clients' },
  { label: 'About', to: '/about' },
  { label: 'Submit Docs', to: '/upload' },
  { label: 'Track', to: '/track' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  const isHome = location.pathname === '/'
  const transparent = isHome && !scrolled && !menuOpen

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      transparent ? 'bg-transparent' : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-blue-700 transition-colors">
              <span className="text-white font-black text-lg">N</span>
            </div>
            <div className="leading-tight">
              <p className={`font-black text-base ${transparent ? 'text-white' : 'text-gray-900'}`}>
                Notary Solutions
              </p>
              <p className={`text-xs font-semibold ${transparent ? 'text-blue-200' : 'text-blue-600'}`}>
                Galveston County, TX
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname === link.to
                    ? transparent
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-50 text-blue-700'
                    : transparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-3 bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-lg ${transparent ? 'text-white' : 'text-gray-700'}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 shadow-xl">
          <div className="space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  location.pathname === link.to
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-3 rounded-xl text-center text-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
