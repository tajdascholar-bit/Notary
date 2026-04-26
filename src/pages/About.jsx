import { Link } from 'react-router-dom'
import { IMG } from '../lib/images'

const creds = [
  { title: 'NNA Certified', sub: 'National Notary Association', desc: 'Gold standard for notary professionals in the United States.' },
  { title: 'LSS Certified', sub: 'Loan Signing System', desc: 'Mortgage packages handled correctly every time.' },
  { title: 'Background Checked', sub: 'Annual NNA Screening', desc: 'Annual screening required by most lenders and title companies.' },
  { title: 'E&O Insured', sub: 'Errors & Omissions', desc: 'Professional liability coverage protecting you on every signing.' },
]

const stats = [
  { value: '500+', label: 'Signings' },
  { value: '8+', label: 'Years' },
  { value: '50+', label: 'Business Clients' },
  { value: '5.0', label: '★ Rating' },
]

const values = [
  { title: 'Reliability You Can Count On', desc: "We show up on time, every time. If there's ever an issue, we communicate proactively — never leaving you guessing." },
  { title: 'Professionalism at Every Signing', desc: 'Dressed professionally, respectful of your clients, fully prepared with every document handled carefully.' },
  { title: 'Precision With Documents', desc: "We understand the legal significance of every document we notarize. Errors cost time and money — we prevent them." },
  { title: 'Galveston County-First Commitment', desc: "We live and work here. We know Galveston County's real estate market, legal community, and business landscape intimately." },
]

const platforms = ['Snapdocs', '123Notary', 'Notary Rotary', 'ServiceLink', 'Yelp', 'Thumbtack']

export default function About() {
  return (
    <div className="pt-18">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <img src={IMG.about} alt="Professional notary" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 to-slate-900/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">About Us</p>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              Trusted Notary Professionals Serving Galveston County
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed">
              Certified, insured, and experienced — built to be the most dependable notary service for businesses in Galveston County.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-5xl font-black text-white">{s.value}</p>
                <p className="text-blue-200 text-sm font-semibold mt-1 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story — split */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img src={IMG.b2bMeeting} alt="Our story" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-4 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 max-w-[200px]">
                <p className="text-4xl font-black text-blue-700">8+</p>
                <p className="text-gray-600 text-sm font-semibold">Years serving Galveston County businesses</p>
              </div>
            </div>
            <div>
              <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Our Story</p>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Built for Galveston County's Business Community</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Notary Solutions Galveston County was founded on a simple belief: Galveston County businesses deserve a notary partner who treats every signing with the same care and urgency their clients do.</p>
                <p>After seeing closings delayed, loan packages rejected, and law firms struggling to find reliable coverage, we set out to do it right — training to the highest industry standards and building our practice around B2B client needs.</p>
                <p>Today, we serve title companies, law firms, mortgage lenders, and businesses across Galveston County. Our clients trust us because we've earned it — one signing at a time.</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { label: 'Respond within 2 hours', desc: 'To every business inquiry, every day.' },
                  { label: 'Never miss a signing', desc: 'We confirm, show up, and complete every appointment.' },
                  { label: 'Communicate proactively', desc: 'Any delay or issue — you hear from us first.' },
                  { label: 'Handle docs with care', desc: 'Every page treated as the legal document it is.' },
                ].map(item => (
                  <div key={item.label} className="bg-blue-50 rounded-xl p-4">
                    <p className="font-bold text-blue-900 text-sm mb-1">{item.label}</p>
                    <p className="text-blue-700 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-3">Credentials</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Certified to the Highest Standards</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Our certifications meet and exceed the requirements of every major lender, title company, and law firm in Texas.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {creds.map((cred, i) => (
              <div key={cred.title} className="bg-slate-900 border border-slate-700 rounded-2xl p-7 text-center hover:border-blue-500 transition-colors group">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={[
                      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                      'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                      'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                      'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
                    ][i]} />
                  </svg>
                </div>
                <h3 className="font-black text-white text-lg mb-1">{cred.title}</h3>
                <p className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-3">{cred.sub}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{cred.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Our Values</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">What Sets Us Apart</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((val, i) => (
              <div key={val.title} className="flex items-start gap-5 bg-slate-50 border border-gray-100 rounded-2xl p-7 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center shrink-0 text-white font-black text-xl">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-lg mb-2">{val.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-blue-50 border-y border-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-700 font-bold uppercase tracking-widest text-sm mb-6">Active on All Major Platforms</p>
          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map(p => (
              <span key={p} className="bg-white border border-blue-200 text-blue-800 font-bold px-6 py-2.5 rounded-full text-sm shadow-sm">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-black text-white mb-4">Work With a Notary You Can Trust</h2>
          <p className="text-slate-400 text-lg mb-8">Book a signing or set up a business account today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-amber-500 hover:bg-amber-400 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all">
              Contact Us
            </Link>
            <Link to="/services" className="border border-slate-600 hover:border-slate-400 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
