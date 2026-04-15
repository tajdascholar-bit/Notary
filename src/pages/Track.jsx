import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

const STATUS_STEPS = ['pending', 'reviewing', 'notarized', 'completed']
const STATUS_INFO = {
  pending:   { label: 'Pending Review',    desc: 'Your documents have been received and are in our queue.',          color: 'text-yellow-700', bg: 'bg-yellow-100' },
  reviewing: { label: 'Under Review',      desc: 'Our notary is currently reviewing your documents.',                 color: 'text-blue-700',   bg: 'bg-blue-100' },
  notarized: { label: 'Notarized — Ready', desc: 'Your documents have been notarized. Download them below.',         color: 'text-purple-700', bg: 'bg-purple-100' },
  completed: { label: 'Completed',         desc: 'Your notarization is complete. Transaction closed.',               color: 'text-green-700',  bg: 'bg-green-100' },
}

function formatDate(str) {
  if (!str) return '—'
  return new Date(str).toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function formatBytes(bytes) {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

export default function Track() {
  const [params] = useSearchParams()
  const [id, setId] = useState(params.get('id') || '')
  const [email, setEmail] = useState(params.get('email') || '')
  const [submission, setSubmission] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const lookup = async (e) => {
    if (e) e.preventDefault()
    if (!id.trim() || !email.trim()) {
      setError('Please enter both your submission ID and email.')
      return
    }
    setLoading(true)
    setError('')
    setSubmission(null)
    setSearched(true)
    try {
      const res = await fetch(`/api/submissions/${encodeURIComponent(id.trim())}/track?email=${encodeURIComponent(email.trim())}`)
      if (res.ok) {
        setSubmission(await res.json())
      } else {
        const data = await res.json()
        setError(data.error || 'Submission not found.')
      }
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Auto-lookup if URL params are present
  useEffect(() => {
    if (params.get('id') && params.get('email')) lookup()
  }, [])

  const notarizedDocs = submission?.documents?.filter(d => d.doc_type === 'notarized') || []
  const originalDocs = submission?.documents?.filter(d => d.doc_type === 'original') || []
  const statusIndex = STATUS_STEPS.indexOf(submission?.status)

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-2xl">
            <p className="text-blue-300 font-semibold uppercase tracking-widest text-sm mb-3">Track Submission</p>
            <h1 className="text-4xl font-bold mb-4">Check Your Document Status</h1>
            <p className="text-blue-100 text-lg">
              Enter your submission ID and email address to see the current status and download notarized documents.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Lookup form */}
        <form onSubmit={lookup} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Look Up Your Submission</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Submission ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={id}
                onChange={e => setId(e.target.value)}
                placeholder="e.g. a1b2c3d4-..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="The email you used when submitting"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-bold px-6 py-3 rounded-lg transition-colors"
          >
            {loading ? 'Looking up...' : 'Track Submission'}
          </button>
        </form>

        {/* Result */}
        {submission && (
          <div className="space-y-6">
            {/* Status header */}
            <div className={`rounded-2xl p-6 ${STATUS_INFO[submission.status]?.bg || 'bg-gray-100'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Current Status</p>
                  <p className={`text-2xl font-bold ${STATUS_INFO[submission.status]?.color || 'text-gray-900'}`}>
                    {STATUS_INFO[submission.status]?.label || submission.status}
                  </p>
                  <p className="text-gray-700 mt-1 text-sm">
                    {STATUS_INFO[submission.status]?.desc}
                  </p>
                </div>
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  Updated {formatDate(submission.updated_at)}
                </p>
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex items-center">
                  {STATUS_STEPS.map((step, i) => {
                    const done = i <= statusIndex
                    const active = i === statusIndex
                    return (
                      <div key={step} className="flex-1 flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          done ? 'bg-blue-700 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'
                        } ${active ? 'ring-4 ring-blue-200' : ''}`}>
                          {done && !active ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            i + 1
                          )}
                        </div>
                        {i < STATUS_STEPS.length - 1 && (
                          <div className={`flex-1 h-1 mx-1 rounded-full ${i < statusIndex ? 'bg-blue-700' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-between mt-1.5">
                  {STATUS_STEPS.map(step => (
                    <span key={step} className="text-xs text-gray-500 capitalize">
                      {step === 'notarized' ? 'Ready' : step}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Submission details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Submission Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">Name:</span> <span className="font-medium text-gray-900">{submission.client_name}</span></div>
                <div><span className="text-gray-500">Service:</span> <span className="font-medium text-gray-900">{submission.service_type}</span></div>
                {submission.company && <div><span className="text-gray-500">Company:</span> <span className="font-medium text-gray-900">{submission.company}</span></div>}
                <div><span className="text-gray-500">Submitted:</span> <span className="font-medium text-gray-900">{formatDate(submission.submitted_at)}</span></div>
                <div><span className="text-gray-500">Documents:</span> <span className="font-medium text-gray-900">{originalDocs.length} uploaded</span></div>
              </div>
              {submission.notes && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Your Notes:</p>
                  <p className="text-sm text-gray-800">{submission.notes}</p>
                </div>
              )}
            </div>

            {/* Notarized documents download */}
            {notarizedDocs.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-bold text-green-900">Notarized Documents Ready</h3>
                </div>
                <div className="space-y-2">
                  {notarizedDocs.map(doc => (
                    <div key={doc.id} className="flex items-center gap-3 bg-white border border-green-200 rounded-lg px-4 py-3">
                      <div className="w-9 h-9 bg-green-100 text-green-700 rounded-md flex items-center justify-center text-xs font-bold shrink-0">
                        {doc.original_name.split('.').pop().toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.original_name}</p>
                        <p className="text-xs text-gray-500">{formatBytes(doc.size_bytes)}</p>
                      </div>
                      <a
                        href={
                          doc.stored_name.startsWith('http')
                            ? doc.stored_name                         // Vercel Blob URL (prod)
                            : `/api/files/${doc.stored_name}?submission_id=${submission.id}&email=${encodeURIComponent(email)}`
                        }
                        download={doc.original_name}
                        className="flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Still processing */}
            {notarizedDocs.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 text-sm">
                <p className="font-semibold text-yellow-900 mb-1">Documents Not Yet Ready</p>
                <p className="text-yellow-800">
                  Your notarized documents are not available yet. We&apos;ll have them ready within 1–2 business days.
                  Check back here or contact us at{' '}
                  <a href="tel:+17135550192" className="underline">(713) 555-0192</a>.
                </p>
              </div>
            )}
          </div>
        )}

        {/* No submission found */}
        {searched && !submission && !loading && !error && (
          <div className="text-center text-gray-500 py-8">No submission found.</div>
        )}

        <div className="mt-10 text-center">
          <Link to="/upload" className="text-blue-700 hover:text-blue-800 font-semibold text-sm">
            Submit new documents
          </Link>
          <span className="mx-3 text-gray-300">|</span>
          <Link to="/contact" className="text-blue-700 hover:text-blue-800 font-semibold text-sm">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
