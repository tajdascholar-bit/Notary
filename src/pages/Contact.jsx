import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IMG } from '../lib/images'

const SERVICE_TYPES = [
  'Real Estate Closing', 'Legal Documents', 'Loan Signing',
  'Corporate / Business Documents', 'Power of Attorney',
  'Affidavit / Sworn Statement', 'Will / Trust Documents',
  'Set Up Business Account', 'Other',
]

const contactItems = [
  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Phone', value: '(713) 555-0192', href: 'tel:+17135550192' },
  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: 'info@notarysolutionsgalveston.com', href: 'mailto:info@notarysolutionsgalveston.com' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Service Area', value: 'Galveston County, TX', href: null },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Hours', value: 'Mon–Sat 7am–8pm · Sun by appt', href: null },
]

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors'

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', serviceType: '', date: '', message: '', isBusinessAccount: false })
  const [submitted, setSubmitted] = useState(false)

  const set = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  return (
    <div className="pt-18">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <img src={IMG.hero} alt="Document" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 to-blue-950/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Contact & Booking</p>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              Book a Notary or Set Up Your Account
            </h1>
            <p className="text-slate-300 text-xl">
              Same-day appointments available. We respond within 2 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left: info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Response guarantee card */}
              <div className="relative overflow-hidden rounded-2xl">
                <img src={IMG.b2bMeeting} alt="Professional" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-slate-950/70 flex items-end p-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-green-400 font-bold text-sm">2-Hour Response Guarantee</span>
                    </div>
                    <p className="text-slate-300 text-sm">Monday–Saturday on all business inquiries.</p>
                  </div>
                </div>
              </div>

              {/* Contact details */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                {contactItems.map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                      {item.href
                        ? <a href={item.href} className="text-gray-900 font-semibold text-sm hover:text-blue-700 transition-colors">{item.value}</a>
                        : <p className="text-gray-900 font-semibold text-sm">{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scheduling */}
              <div className="bg-blue-700 rounded-2xl p-6 text-white">
                <p className="font-black text-lg mb-2">Prefer to Pick a Time?</p>
                <p className="text-blue-200 text-sm mb-4">Use our online scheduling calendar to book a specific slot instantly.</p>
                <a href="#" className="block bg-white text-blue-700 font-black text-center py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                  Open Scheduling Calendar
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Request Received!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you, <strong>{form.name}</strong>. We&apos;ll reach out to <strong>{form.email}</strong> within 2 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="text-blue-700 font-bold text-sm underline">
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
                  <h2 className="text-2xl font-black text-gray-900">Request a Notary</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Your Name" required>
                      <input type="text" name="name" required value={form.name} onChange={set} placeholder="Jane Smith" className={inputCls} />
                    </Field>
                    <Field label="Company / Firm">
                      <input type="text" name="company" value={form.company} onChange={set} placeholder="Optional" className={inputCls} />
                    </Field>
                    <Field label="Email" required>
                      <input type="email" name="email" required value={form.email} onChange={set} placeholder="jane@example.com" className={inputCls} />
                    </Field>
                    <Field label="Phone">
                      <input type="tel" name="phone" value={form.phone} onChange={set} placeholder="(713) 000-0000" className={inputCls} />
                    </Field>
                    <Field label="Service Needed" required>
                      <select name="serviceType" required value={form.serviceType} onChange={set} className={inputCls + ' bg-gray-50'}>
                        <option value="">Select...</option>
                        {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Preferred Date">
                      <input type="date" name="date" value={form.date} onChange={set} className={inputCls} />
                    </Field>
                  </div>

                  <Field label="Additional Details">
                    <textarea name="message" rows={4} value={form.message} onChange={set} placeholder="Describe your needs, document types, location, or special requirements..." className={inputCls + ' resize-none'} />
                  </Field>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" name="isBusinessAccount" checked={form.isBusinessAccount} onChange={set} className="mt-1 h-4 w-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">
                      <strong>Interested in a business account</strong> — volume pricing, monthly invoicing, and priority scheduling.
                    </span>
                  </label>

                  <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-4 rounded-2xl text-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-700/20">
                    Submit Request
                  </button>
                  <p className="text-center text-gray-400 text-xs">
                    We respond within 2 hours on business days. Your information is kept confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
