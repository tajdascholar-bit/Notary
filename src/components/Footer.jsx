import { Link } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Business Clients', to: '/business-clients' },
  { label: 'About', to: '/about' },
  { label: 'Submit Documents', to: '/upload' },
  { label: 'Track Submission', to: '/track' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">D</span>
              </div>
              <div>
                <p className="text-white font-black text-lg leading-none">Dickerson Mobile Notary</p>
                <p className="text-blue-400 text-xs font-semibold">Galveston County, TX</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-sm">
              Professional mobile notary services for real estate, law firms, mortgage
              lenders, and businesses across Galveston County. Certified, insured, always on time.
            </p>
            <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-700/40 rounded-full px-3 py-1.5 text-sm text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Responding within 2 hours
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Pages</h3>
            <ul className="space-y-2">
              {links.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3">
              {[
                { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '(713) 555-0192', href: 'tel:+17135550192' },
                { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'info@dickersonmobilenotary.com', href: 'mailto:info@dickersonmobilenotary.com' },
                { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', text: 'Galveston County, TX', href: null },
                { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Mon–Sat 7am–8pm', href: null },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <svg className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {item.href
                    ? <a href={item.href} className="hover:text-white transition-colors">{item.text}</a>
                    : <span>{item.text}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Dickerson Mobile Notary. All rights reserved.</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {['NNA Certified', 'LSS Certified', 'E&O Insured', 'Background Checked'].map(b => (
              <span key={b} className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
