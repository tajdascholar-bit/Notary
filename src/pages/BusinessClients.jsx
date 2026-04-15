import { Link } from 'react-router-dom'

const targetClients = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Title Companies',
    desc: 'We are listed on Snapdocs and available for direct signing assignments. Real-time status updates on every closing.',
    perks: ['Snapdocs-integrated', 'E&O insured', 'Background-checked'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: 'Law Firms',
    desc: 'Office visits on demand. We handle affidavits, POA, trust documents, and court filings with the discretion your firm requires.',
    perks: ['Office visits available', 'Bulk signing packages', 'Confidential handling'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Mortgage Lenders',
    desc: 'NNA-certified signing agent for all loan packages. We meet lender compliance standards and provide signing confirmations.',
    perks: ['NNA certified', 'Lender-compliant', 'Signing confirmations'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Corporations & HR Teams',
    desc: 'On-site notary visits for employee onboarding, contracts, and corporate governance documents. Schedule recurring visits.',
    perks: ['On-site visits', 'Bulk employee signings', 'Recurring scheduling'],
  },
]

const pricingTiers = [
  {
    name: 'Pay-Per-Signing',
    price: '$75',
    unit: 'per appointment',
    description: 'Perfect for occasional notarization needs.',
    features: [
      'Single document packages',
      'Mobile service within Houston',
      'Next-day scheduling',
      'Digital receipt provided',
    ],
    cta: 'Book Now',
    highlight: false,
  },
  {
    name: 'Business Account',
    price: '$55',
    unit: 'per signing (volume)',
    description: 'For firms with 5+ signings per month.',
    features: [
      'All pay-per-signing features',
      'Priority same-day scheduling',
      'Monthly invoicing',
      'Dedicated account contact',
      'Volume discount pricing',
      'Online portal access',
    ],
    cta: 'Set Up Account',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: 'negotiated rate',
    description: 'For high-volume title companies and lenders.',
    features: [
      'All Business Account features',
      'Snapdocs / ServiceLink integration',
      'Bulk signing batches',
      'Dedicated notary team',
      'SLA-backed turnaround',
      'Quarterly account review',
    ],
    cta: 'Contact Us',
    highlight: false,
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Contact Us',
    desc: 'Fill out our business inquiry form or call us directly. We respond within 2 hours.',
  },
  {
    step: '02',
    title: 'Account Setup',
    desc: 'We create your business profile, establish pricing, and set up invoicing preferences.',
  },
  {
    step: '03',
    title: 'Book Anytime',
    desc: 'Submit signing requests via phone, email, or our online booking portal.',
  },
  {
    step: '04',
    title: 'We Handle It',
    desc: 'Our team confirms, executes, and reports back on every signing — consistently.',
  },
]

export default function BusinessClients() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-indigo-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-blue-300 font-semibold uppercase tracking-widest text-sm mb-3">Business Clients</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Your Dedicated Notary Partner in Houston
            </h1>
            <p className="text-blue-100 text-xl leading-relaxed">
              Volume pricing, business accounts, and priority scheduling for title companies,
              law firms, mortgage lenders, and corporations.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-8 bg-white text-blue-800 font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors"
            >
              Set Up Your Business Account
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We understand the demands of your industry — tight deadlines, compliance requirements,
            and the need for a notary you can rely on every time.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetClients.map(client => (
            <div key={client.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-4">
                {client.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{client.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{client.desc}</p>
              <ul className="space-y-1">
                {client.perks.map(perk => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 text-lg">
              No hidden fees. Volume pricing for repeat business clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map(tier => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 ${
                  tier.highlight
                    ? 'bg-blue-700 text-white shadow-xl scale-105'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {tier.highlight && (
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                    MOST POPULAR
                  </span>
                )}
                <h3 className={`text-xl font-bold mb-1 ${tier.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {tier.name}
                </h3>
                <div className="mb-2">
                  <span className={`text-4xl font-bold ${tier.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm ml-1 ${tier.highlight ? 'text-blue-200' : 'text-gray-500'}`}>
                    {tier.unit}
                  </span>
                </div>
                <p className={`text-sm mb-6 ${tier.highlight ? 'text-blue-200' : 'text-gray-600'}`}>
                  {tier.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {tier.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <svg
                        className={`w-5 h-5 shrink-0 mt-0.5 ${tier.highlight ? 'text-blue-200' : 'text-green-600'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={tier.highlight ? 'text-blue-100' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center font-bold py-3 rounded-lg transition-colors ${
                    tier.highlight
                      ? 'bg-white text-blue-700 hover:bg-blue-50'
                      : 'bg-blue-700 text-white hover:bg-blue-800'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Business Accounts Work
          </h2>
          <p className="text-gray-600 text-lg">Getting started is fast and easy.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, i) => (
            <div key={step.step} className="relative">
              {i < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -translate-x-1/2 z-0" />
              )}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Set Up Your Business Account?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Fill out our business inquiry form and we will contact you within 2 hours to
            discuss your needs and get you set up.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors"
          >
            Start Your Business Account
          </Link>
        </div>
      </section>
    </div>
  )
}
