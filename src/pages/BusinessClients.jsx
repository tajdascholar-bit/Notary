import { Link } from 'react-router-dom'
import { IMG } from '../lib/images'

const industries = [
  { img: IMG.realEstate, title: 'Title Companies', desc: 'Snapdocs-integrated, E&O insured, and background-checked. We receive direct signing orders and deliver real-time status updates on every closing.', tags: ['Snapdocs', 'ServiceLink', 'E&O Insured'] },
  { img: IMG.legal, title: 'Law Firms', desc: 'Office visits on demand. Affidavits, POA, trust documents, and court filings handled with the discretion your firm requires.', tags: ['Office Visits', 'Bulk Packages', 'Confidential'] },
  { img: IMG.loan, title: 'Mortgage Lenders', desc: 'NNA-certified signing agent for all loan packages. We meet lender compliance standards and provide signing confirmations every time.', tags: ['NNA Certified', 'Lender-Compliant', 'Confirmations'] },
  { img: IMG.corporate, title: 'Corporations & HR', desc: 'On-site notary visits for employee onboarding, contracts, and governance documents. Schedule recurring monthly visits.', tags: ['On-Site Visits', 'Bulk Signings', 'Recurring'] },
]

const tiers = [
  {
    name: 'Pay-Per-Signing',
    price: '$75',
    unit: 'per appointment',
    desc: 'Perfect for occasional needs.',
    features: ['Single document packages', 'Mobile service in Houston', 'Next-day scheduling', 'Digital receipt'],
    cta: 'Book Now', to: '/contact', highlight: false,
  },
  {
    name: 'Business Account',
    price: '$55',
    unit: 'per signing (5+ / month)',
    desc: 'Best for firms with regular volume.',
    features: ['All pay-per-signing features', 'Priority same-day scheduling', 'Monthly invoicing', 'Dedicated account contact', 'Volume discounts', 'Online portal access'],
    cta: 'Set Up Account', to: '/contact', highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: 'negotiated rate',
    desc: 'For high-volume title companies and lenders.',
    features: ['All Business Account features', 'Snapdocs / ServiceLink integration', 'Bulk signing batches', 'SLA-backed turnaround', 'Quarterly account review'],
    cta: 'Contact Us', to: '/contact', highlight: false,
  },
]

const steps = [
  { n: '01', title: 'Contact Us', desc: 'Fill out the business inquiry form or call directly. We respond within 2 hours.' },
  { n: '02', title: 'Account Setup', desc: 'We create your business profile, set pricing, and configure invoicing.' },
  { n: '03', title: 'Book Anytime', desc: 'Submit signing requests via phone, email, or our online portal.' },
  { n: '04', title: 'We Handle It', desc: 'We confirm, execute, and report back on every signing — consistently.' },
]

export default function BusinessClients() {
  return (
    <div className="pt-18">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <img src={IMG.b2bMeeting} alt="Business meeting" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 to-blue-950/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Business Clients</p>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              Your Dedicated Notary Partner in Houston
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed mb-8">
              Volume pricing, business accounts, and priority scheduling for title companies,
              law firms, mortgage lenders, and corporations.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all hover:-translate-y-0.5">
              Set Up Your Business Account
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Industries We Serve</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Built for Your Industry</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map(ind => (
              <div key={ind.title} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={ind.img} alt={ind.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-white font-black text-xl">{ind.title}</h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{ind.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ind.tags.map(tag => (
                      <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Simple, Transparent Pricing</h2>
            <p className="text-gray-500 text-lg">No hidden fees. Volume pricing for business clients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map(tier => (
              <div key={tier.name} className={`rounded-3xl p-8 relative ${tier.highlight ? 'bg-blue-700 text-white shadow-2xl shadow-blue-700/30 scale-105' : 'bg-white border border-gray-200 shadow-sm'}`}>
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg">MOST POPULAR</span>
                  </div>
                )}
                <p className={`font-black text-xl mb-1 ${tier.highlight ? 'text-white' : 'text-gray-900'}`}>{tier.name}</p>
                <div className="mb-1">
                  <span className={`text-5xl font-black ${tier.highlight ? 'text-white' : 'text-gray-900'}`}>{tier.price}</span>
                  <span className={`text-sm ml-1 ${tier.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{tier.unit}</span>
                </div>
                <p className={`text-sm mb-6 ${tier.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{tier.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <svg className={`w-5 h-5 shrink-0 mt-0.5 ${tier.highlight ? 'text-blue-200' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={tier.highlight ? 'text-blue-100' : 'text-gray-700'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to={tier.to} className={`block text-center font-black py-3.5 rounded-xl transition-colors ${tier.highlight ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-blue-700 text-white hover:bg-blue-800'}`}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Process</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">How Business Accounts Work</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.n} className="text-center">
                <div className="w-16 h-16 bg-blue-700 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg shadow-blue-700/30">
                  {step.n}
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <img src={IMG.b2bMeeting} alt="Business" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-950/90" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Partner With Us?</h2>
          <p className="text-blue-200 text-lg mb-8">We respond to all business inquiries within 2 hours.</p>
          <Link to="/contact" className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-black px-10 py-4 rounded-2xl text-lg transition-all hover:-translate-y-0.5">
            Start Your Business Account
          </Link>
        </div>
      </section>
    </div>
  )
}
