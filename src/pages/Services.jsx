import { Link } from 'react-router-dom'

const serviceCategories = [
  {
    id: 'real-estate',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Real Estate Closings',
    subtitle: 'For Title Companies & Real Estate Attorneys',
    description:
      'We handle the full range of real estate closing documents with the precision title companies and agents demand. Our certified signing agents are trained on ALTA/RESPA documents and familiar with Texas closing procedures.',
    items: [
      'Purchase & sale agreements',
      'Deed of trust notarizations',
      'Title transfer documents',
      'HUD-1 / Closing Disclosure (CD)',
      'ALTA statements',
      'Grant deeds & quitclaim deeds',
      'Seller / buyer affidavits',
      'HOA documents',
    ],
    highlight: 'Listed on Snapdocs — receive direct signing orders from title companies',
    color: 'blue',
  },
  {
    id: 'legal',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: 'Legal Documents',
    subtitle: 'For Law Firms & Legal Professionals',
    description:
      'From simple affidavits to complex multi-document packages, we provide fast, legally compliant notarization services for Houston law firms. Mobile service available — we come to your office.',
    items: [
      'Affidavits & sworn statements',
      'Power of attorney (general, durable, medical)',
      'Wills & advance directives',
      'Trust documents',
      'Court filings & depositions',
      'Immigration documents',
      'Apostille-ready notarizations',
      'Contract & agreement notarizations',
    ],
    highlight: 'Same-day office visits for law firms — call before noon for afternoon availability',
    color: 'indigo',
  },
  {
    id: 'loan-signings',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Loan Signings',
    subtitle: 'For Mortgage Lenders & Banks',
    description:
      'As a certified Loan Signing Agent (LSA), we execute mortgage and refinance packages with precision. We coordinate directly with lenders to ensure timely, error-free closings that protect your pipeline.',
    items: [
      'Purchase money mortgages',
      'Refinance packages',
      'Home equity loans (HELOC)',
      'Reverse mortgage documents',
      'Construction loan signings',
      'VA & FHA loan packages',
      'Commercial loan documents',
    ],
    highlight: 'NNA-certified & background checked — meets all lender compliance requirements',
    color: 'green',
  },
  {
    id: 'corporate',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Corporate Notarizations',
    subtitle: 'For Businesses of All Sizes',
    description:
      'Keep your business operations running smoothly with fast, on-demand notary services. We offer on-site corporate visits and can handle large document batches for HR, legal, and compliance teams.',
    items: [
      'Corporate resolutions',
      'Articles of incorporation / bylaws',
      'Business contracts & agreements',
      'Employment documents (I-9, NDAs)',
      'Board member authorizations',
      'Vendor & partnership agreements',
      'International business documents',
    ],
    highlight: 'On-site corporate visits available — we come to your office or conference room',
    color: 'purple',
  },
]

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'bg-blue-100 text-blue-700',
    badge: 'bg-blue-700 text-white',
    bullet: 'text-blue-600',
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    icon: 'bg-indigo-100 text-indigo-700',
    badge: 'bg-indigo-700 text-white',
    bullet: 'text-indigo-600',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'bg-green-100 text-green-700',
    badge: 'bg-green-700 text-white',
    bullet: 'text-green-600',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: 'bg-purple-100 text-purple-700',
    badge: 'bg-purple-700 text-white',
    bullet: 'text-purple-600',
  },
}

export default function Services() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-blue-300 font-semibold uppercase tracking-widest text-sm mb-3">Our Services</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Professional Notary Services for Every Need
            </h1>
            <p className="text-blue-100 text-xl leading-relaxed">
              From real estate closings to corporate documents — fully certified, insured,
              and available same-day throughout the Greater Houston area.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {serviceCategories.map(cat => {
          const c = colorMap[cat.color]
          return (
            <div
              key={cat.id}
              id={cat.id}
              className={`${c.bg} ${c.border} border rounded-2xl overflow-hidden`}
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Icon + title */}
                  <div className="md:w-72 shrink-0">
                    <div className={`w-16 h-16 ${c.icon} rounded-xl flex items-center justify-center mb-4`}>
                      {cat.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{cat.title}</h2>
                    <p className="text-gray-600 text-sm font-medium">{cat.subtitle}</p>
                    <div className={`mt-4 ${c.badge} text-xs font-semibold px-3 py-1.5 rounded-full inline-block`}>
                      Available Same-Day
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed mb-6">{cat.description}</p>
                    <h3 className="font-semibold text-gray-900 mb-3">Documents We Handle:</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cat.items.map(item => (
                        <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                          <svg className={`w-5 h-5 ${c.bullet} shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Highlight */}
                    <div className="mt-6 flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-white">
                      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-800 text-sm font-medium">{cat.highlight}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Notary Services Today?</h2>
          <p className="text-blue-200 text-lg mb-8">
            Book online or call us. Same-day availability throughout Houston.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-700 font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors"
            >
              Book Appointment
            </Link>
            <Link
              to="/business-clients"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-colors"
            >
              Set Up Business Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
