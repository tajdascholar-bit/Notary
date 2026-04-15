import { Link } from 'react-router-dom'

const credentials = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'NNA Certified',
    subtitle: 'National Notary Association',
    desc: 'Fully certified by the NNA — the gold standard for notary professionals in the United States.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'LSS Certified',
    subtitle: 'Loan Signing System',
    desc: 'Certified through the Loan Signing System — meaning we handle mortgage packages correctly every time.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Background Checked',
    subtitle: 'Annual Screening',
    desc: 'Annual background checks through the NNA — required by most lenders and title companies.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: 'E&O Insured',
    subtitle: 'Errors & Omissions Coverage',
    desc: 'Fully covered with professional liability insurance — protecting you and your clients on every signing.',
  },
]

const stats = [
  { value: '500+', label: 'Signings Completed' },
  { value: '8+', label: 'Years Experience' },
  { value: '50+', label: 'Business Clients' },
  { value: '5★', label: 'Google Rating' },
]

const values = [
  {
    title: 'Reliability You Can Count On',
    desc: 'We show up on time, every time. If there\'s ever an issue, we communicate proactively — never leaving you guessing.',
  },
  {
    title: 'Professionalism at Every Signing',
    desc: 'Dressed professionally, respectful of your clients, and fully prepared with every document handled carefully.',
  },
  {
    title: 'Precision With Documents',
    desc: 'We understand the legal significance of every document we notarize. Errors cost time and money — we prevent them.',
  },
  {
    title: 'Houston-First Commitment',
    desc: 'We live and work here. We know Houston\'s real estate market, legal community, and business landscape intimately.',
  },
]

export default function About() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-indigo-300 font-semibold uppercase tracking-widest text-sm mb-3">About Us</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Trusted Notary Professionals Serving Houston
            </h1>
            <p className="text-gray-200 text-xl leading-relaxed">
              Certified, insured, and experienced — we built Notary Solutions Houston to be
              the most dependable notary service for businesses in the Greater Houston area.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(stat => (
              <div key={stat.label}>
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Notary Solutions Houston was founded on a simple belief: Houston businesses deserve
                a notary partner who treats every signing with the same care and urgency that their
                clients do.
              </p>
              <p>
                After years of seeing closings delayed, loan packages rejected for errors, and
                law firms struggling to find reliable notary coverage, we set out to do it right.
                We trained to the highest industry standards — NNA certification, LSS loan signing
                certification, and annual background checks — and built our practice around the
                needs of B2B clients.
              </p>
              <p>
                Today, we serve title companies, law firms, mortgage lenders, and businesses across
                Greater Houston. Our clients trust us because we&apos;ve earned it — one signing at a time.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="font-bold text-gray-900 text-xl mb-6">Our Commitment to You</h3>
            <ul className="space-y-5">
              {[
                { label: 'Respond within 2 hours', desc: 'To every business inquiry, every day.' },
                { label: 'Never miss a signing', desc: 'We confirm, show up, and complete every appointment.' },
                { label: 'Communicate proactively', desc: 'Any delay or issue — you hear from us first.' },
                { label: 'Handle documents with care', desc: 'Every page treated as the legal document it is.' },
              ].map(item => (
                <li key={item.label} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Credentials &amp; Certifications
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our certifications meet and exceed the requirements of every major lender, title company,
              and law firm in Texas.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map(cred => (
              <div key={cred.title} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  {cred.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{cred.title}</h3>
                <p className="text-blue-700 text-xs font-semibold uppercase tracking-wide mb-3">
                  {cred.subtitle}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{cred.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Sets Us Apart
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map(val => (
            <div key={val.title} className="flex items-start gap-5 bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{val.title}</h3>
                <p className="text-gray-600 leading-relaxed">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Listed on platforms */}
      <section className="bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Find Us On Signing Platforms
          </h2>
          <p className="text-gray-600 mb-6">
            We are active on all major platforms that connect notaries with real estate and mortgage professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Snapdocs', '123Notary', 'Notary Rotary', 'ServiceLink', 'Yelp', 'Thumbtack'].map(platform => (
              <span
                key={platform}
                className="bg-white border border-blue-200 text-blue-800 font-semibold px-5 py-2 rounded-full text-sm"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-3xl font-bold mb-4">Work With a Notary You Can Trust</h2>
          <p className="text-gray-400 text-lg mb-8">
            Book a signing or set up a business account today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/services"
              className="border-2 border-gray-600 hover:border-gray-400 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
