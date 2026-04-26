import { Link } from 'react-router-dom'
import { IMG } from '../lib/images'

const categories = [
  {
    id: 'real-estate',
    img: IMG.realEstate,
    title: 'Real Estate Closings',
    badge: 'Title Companies & Agents',
    desc: 'We handle the full range of real estate closing documents with the precision title companies and agents demand. Our certified signing agents are trained on ALTA/RESPA documents and familiar with Texas closing procedures.',
    items: ['Purchase & sale agreements', 'Deed of trust notarizations', 'Title transfer documents', 'HUD-1 / Closing Disclosure', 'ALTA statements', 'Grant & quitclaim deeds', 'Buyer/seller affidavits', 'HOA documents'],
    highlight: 'Listed on Snapdocs — receive direct signing orders from title companies',
    accentColor: 'blue',
  },
  {
    id: 'legal',
    img: IMG.legal,
    title: 'Legal Documents',
    badge: 'Law Firms & Attorneys',
    desc: 'From simple affidavits to complex multi-document packages, we provide fast, legally compliant notarization services. Mobile office visits available — we come to you.',
    items: ['Affidavits & sworn statements', 'Power of attorney (all types)', 'Wills & advance directives', 'Trust documents', 'Court filings & depositions', 'Immigration documents', 'Apostille-ready notarizations', 'Contract notarizations'],
    highlight: 'Same-day office visits — call before noon for afternoon availability',
    accentColor: 'indigo',
  },
  {
    id: 'loan-signings',
    img: IMG.loan,
    title: 'Loan Signings',
    badge: 'Mortgage Lenders & Banks',
    desc: 'As a certified Loan Signing Agent, we execute mortgage and refinance packages with precision. We coordinate directly with lenders to ensure timely, error-free closings.',
    items: ['Purchase money mortgages', 'Refinance packages', 'HELOC documents', 'Reverse mortgage docs', 'Construction loan signings', 'VA & FHA packages', 'Commercial loan documents'],
    highlight: 'NNA-certified & background checked — meets all lender compliance requirements',
    accentColor: 'emerald',
  },
  {
    id: 'corporate',
    img: IMG.corporate,
    title: 'Corporate Notarizations',
    badge: 'Businesses of All Sizes',
    desc: 'Keep your business operations running smoothly with fast, on-demand notary services. We offer on-site corporate visits and handle large document batches for HR and legal teams.',
    items: ['Corporate resolutions', 'Articles of incorporation', 'Business contracts', 'Employment docs (I-9, NDAs)', 'Board authorizations', 'Vendor agreements', 'International business docs'],
    highlight: 'On-site corporate visits available — we come to your office',
    accentColor: 'violet',
  },
]

const colorMap = {
  blue:    { badge: 'bg-blue-100 text-blue-800',    ring: 'ring-blue-200',   icon: 'text-blue-600'   },
  indigo:  { badge: 'bg-indigo-100 text-indigo-800', ring: 'ring-indigo-200', icon: 'text-indigo-600' },
  emerald: { badge: 'bg-emerald-100 text-emerald-800', ring: 'ring-emerald-200', icon: 'text-emerald-600' },
  violet:  { badge: 'bg-violet-100 text-violet-800', ring: 'ring-violet-200', icon: 'text-violet-600' },
}

export default function Services() {
  return (
    <div className="pt-18">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <img src={IMG.documents} alt="Documents" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 to-slate-900/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Our Services</p>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              Every Notary Service Your Business Needs
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed mb-8">
              Fully certified, insured, and available same-day throughout Greater Houston.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all hover:-translate-y-0.5">
              Book a Signing Today
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white">
        {categories.map((cat, idx) => {
          const c = colorMap[cat.accentColor]
          const isEven = idx % 2 === 0
          return (
            <div key={cat.id} id={cat.id} className={`${idx > 0 ? 'border-t border-gray-100' : ''}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Image */}
                  <div className={!isEven ? 'lg:col-start-2' : ''}>
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                      <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <span className="bg-white/90 backdrop-blur text-slate-900 text-sm font-bold px-4 py-2 rounded-full">
                          Available Same-Day
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={!isEven ? 'lg:col-start-1' : ''}>
                    <span className={`inline-block text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 ${c.badge}`}>
                      {cat.badge}
                    </span>
                    <h2 className="text-4xl font-black text-gray-900 mb-4">{cat.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{cat.desc}</p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {cat.items.map(item => (
                        <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <svg className={`w-4 h-4 shrink-0 mt-0.5 ${c.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className={`flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6`}>
                      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      <p className="text-amber-800 text-sm font-semibold">{cat.highlight}</p>
                    </div>

                    <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-black px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-700/20">
                      Book This Service
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Need a Notary Today?</h2>
          <p className="text-slate-400 text-lg mb-8">Same-day availability throughout Houston. Book online in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-amber-500 hover:bg-amber-400 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all">
              Book Appointment
            </Link>
            <Link to="/business-clients" className="border border-slate-600 hover:border-slate-400 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all">
              Business Accounts
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
