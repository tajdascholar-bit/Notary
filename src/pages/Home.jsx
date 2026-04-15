import { Link } from 'react-router-dom'

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Real Estate Closings',
    desc: 'Fast, accurate notarization for property transactions, deeds, and title transfers.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Legal Documents',
    desc: 'Affidavits, power of attorney, wills, and all court-required notarizations.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Loan Signings',
    desc: 'Certified Signing Agent services for mortgage lenders and title companies.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Corporate Notarizations',
    desc: 'Business contracts, corporate resolutions, and employee document notarizations.',
  },
]

const trustBadges = [
  { label: 'NNA Certified', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { label: 'LSS Certified', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { label: 'E&O Insured', color: 'bg-green-100 text-green-800 border-green-200' },
  { label: '5-Star Rated', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { label: 'Same-Day Available', color: 'bg-purple-100 text-purple-800 border-purple-200' },
]

const reviews = [
  {
    name: 'Sarah M.',
    company: 'Premier Title Company',
    rating: 5,
    text: 'Extremely professional and always on time. Our go-to notary for all closings in the Houston area.',
  },
  {
    name: 'James L.',
    company: 'Anderson & Partners Law Firm',
    rating: 5,
    text: 'Fast, reliable, and thorough. We\'ve used Notary Solutions for dozens of legal document signings.',
  },
  {
    name: 'Maria R.',
    company: 'First Horizon Mortgage',
    rating: 5,
    text: 'Same-day service saved us multiple times. Their loan signing expertise is unmatched.',
  },
]

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/50 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Available for Same-Day Appointments
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Reliable Notary Services for{' '}
              <span className="text-blue-300">Houston Businesses</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Serving real estate firms, law offices, mortgage lenders, and corporations across
              Greater Houston. Certified, insured, and always on time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-white text-blue-800 font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors text-center"
              >
                Book an Appointment
              </Link>
              <Link
                to="/business-clients"
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-colors text-center"
              >
                Business Accounts
              </Link>
            </div>
            <p className="text-blue-200 text-sm mt-5">
              We respond to business inquiries within 2 hours
            </p>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {trustBadges.map(badge => (
              <span
                key={badge.label}
                className={`${badge.color} border text-sm font-semibold px-4 py-1.5 rounded-full`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Notary Services Built for Business
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From single-document signings to high-volume accounts — we handle it all with
            speed, accuracy, and professionalism.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => (
            <div
              key={service.title}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Title Companies, Law Firms &amp; Lenders
              </h2>
              <p className="text-gray-600 text-lg max-w-xl">
                Set up a business account for streamlined invoicing, priority scheduling,
                and volume pricing. We become your dedicated notary partner.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  'Volume discounts for repeat clients',
                  'Invoice-based billing (no per-signing hassle)',
                  'Dedicated account manager',
                  'Priority same-day scheduling',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/business-clients"
              className="shrink-0 bg-blue-700 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-800 transition-colors"
            >
              Set Up Business Account
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Business Clients Say
          </h2>
          <p className="text-gray-600">Trusted by Houston&#39;s top real estate and legal professionals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div key={review.name} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <Stars count={review.rating} />
              <p className="mt-4 text-gray-700 leading-relaxed">&#8220;{review.text}&#8221;</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Schedule a Notarization?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Book online in minutes. Same-day appointments available. Mobile service throughout Houston.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Book Now
            </Link>
            <a
              href="tel:+17135550192"
              className="border-2 border-gray-600 hover:border-gray-400 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Call (713) 555-0192
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
