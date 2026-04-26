import { Link } from 'react-router-dom'
import { IMG } from '../lib/images'

const services = [
  { title: 'Real Estate Closings', img: IMG.realEstate, desc: 'Deeds, title transfers, ALTA statements, and buyer/seller affidavits.', to: '/services#real-estate', color: 'from-blue-900' },
  { title: 'Legal Documents', img: IMG.legal, desc: 'Affidavits, power of attorney, wills, and court-required notarizations.', to: '/services#legal', color: 'from-indigo-900' },
  { title: 'Loan Signings', img: IMG.loan, desc: 'Certified signing agent for mortgage, refinance, and HELOC packages.', to: '/services#loan-signings', color: 'from-slate-900' },
  { title: 'Corporate Notarizations', img: IMG.corporate, desc: 'Contracts, resolutions, and employee document notarizations on-site.', to: '/services#corporate', color: 'from-blue-950' },
]

const stats = [
  { value: '500+', label: 'Signings Completed' },
  { value: '8+', label: 'Years Experience' },
  { value: '50+', label: 'Business Clients' },
  { value: '2 hr', label: 'Response Guarantee' },
]

const reviews = [
  { name: 'Sarah M.', company: 'Premier Title Co.', initials: 'SM', color: 'bg-blue-600', text: 'Extremely professional and always on time. Our go-to notary for all closings in the Houston area.' },
  { name: 'James L.', company: 'Anderson & Partners Law', initials: 'JL', color: 'bg-indigo-600', text: "Fast, reliable, and thorough. We've used Notary Solutions for dozens of legal document signings." },
  { name: 'Maria R.', company: 'First Horizon Mortgage', initials: 'MR', color: 'bg-violet-600', text: 'Same-day service saved us multiple times. Their loan signing expertise is unmatched.' },
]

const badges = ['NNA Certified', 'LSS Certified', 'E&O Insured', '5-Star Rated', 'Same-Day Available']

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={IMG.hero} alt="Document signing" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-blue-950/80 to-slate-900/70" />

        <div className="relative z-10 text-white text-center px-4 max-w-5xl mx-auto pt-24">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-5 py-2 text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Available for Same-Day Appointments · Houston, TX
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
            Trusted Notary
            <span className="block text-blue-400">Services for</span>
            <span className="block">Houston Businesses</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Serving real estate firms, law offices, mortgage lenders, and corporations.
            Certified, insured, and always on time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-amber-500 hover:bg-amber-400 text-white font-black px-10 py-4 rounded-2xl text-lg shadow-2xl hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5">
              Book an Appointment
            </Link>
            <Link to="/upload" className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all hover:-translate-y-0.5">
              Upload Documents
            </Link>
          </div>

          {/* Scroll cue */}
          <div className="mt-20 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {badges.map(b => (
              <span key={b} className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-3">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Professional Notary Services</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From single signings to high-volume business accounts — all handled with speed and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(s => (
              <Link
                key={s.title}
                to={s.to}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] flex flex-col justify-end cursor-pointer"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${s.color}/80 via-transparent to-transparent`} />
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent`} />
                <div className="relative p-6">
                  <h3 className="text-white font-black text-xl mb-2">{s.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {s.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-blue-400 text-sm font-bold">
                    Learn more
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white font-bold px-7 py-3 rounded-xl transition-all">
              View All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SPLIT SECTION — B2B ── */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img src={IMG.b2bMeeting} alt="Business meeting" className="w-full h-full object-cover" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4 border border-gray-100 max-w-xs">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">2-Hour Response</p>
                  <p className="text-gray-500 text-xs">Guaranteed on all business inquiries</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">For Business Clients</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 leading-tight">
                Your Dedicated<br />Notary Partner
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Title companies, law firms, and mortgage lenders trust us for volume accounts
                with invoicing, priority scheduling, and a notary who knows your industry.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'Volume discounts for 5+ signings/month',
                  'Monthly invoicing — no per-signing hassle',
                  'Priority same-day scheduling',
                  'Snapdocs & ServiceLink integrated',
                  'Dedicated account manager',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/business-clients" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-black px-8 py-4 rounded-2xl text-lg shadow-lg shadow-blue-700/30 transition-all hover:-translate-y-0.5">
                Set Up Business Account
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative py-20 overflow-hidden">
        <img src={IMG.city} alt="Houston city" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-950/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-5xl md:text-6xl font-black text-white mb-2">{s.value}</p>
                <p className="text-blue-300 font-semibold text-sm uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (Upload) ── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Remote Notarization</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Upload. Notarize. Download.</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Send us your documents online and receive notarized copies back within 1–2 business days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { step: '01', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', title: 'Upload Your Docs', desc: 'Submit PDF, JPG, Word, or other files securely through our encrypted portal.' },
              { step: '02', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'We Notarize Them', desc: 'Our certified notary reviews and notarizes your documents — usually same day.' },
              { step: '03', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', title: 'Download & Done', desc: 'Log in with your submission ID to download your completed notarized documents.' },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="relative inline-block mb-5">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                    </svg>
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 text-white text-xs font-black rounded-full flex items-center justify-center">
                    {item.step.replace('0', '')}
                  </span>
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/upload" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-black px-8 py-4 rounded-2xl text-lg shadow-lg shadow-blue-700/20 transition-all hover:-translate-y-0.5">
              Upload Documents Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Client Reviews</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Trusted by Houston Professionals</h2>
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-500">5.0 average from 40+ reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(r => (
              <div key={r.name} className="bg-slate-50 border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <svg className="w-8 h-8 text-blue-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${r.color} rounded-full flex items-center justify-center text-white text-sm font-black shrink-0`}>
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                    <p className="text-gray-500 text-xs">{r.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-28 overflow-hidden">
        <img src={IMG.documents} alt="Documents" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/85" />
        <div className="relative text-white text-center max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black mb-5">
            Ready to Get<br />Started Today?
          </h2>
          <p className="text-slate-300 text-xl mb-10">
            Book a signing or upload your documents now. Same-day service available throughout Houston.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-amber-500 hover:bg-amber-400 text-white font-black px-10 py-4 rounded-2xl text-lg shadow-2xl transition-all hover:-translate-y-0.5">
              Book Appointment
            </Link>
            <Link to="/upload" className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all hover:-translate-y-0.5">
              Upload Documents
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
