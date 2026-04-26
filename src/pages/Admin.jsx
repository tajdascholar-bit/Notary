import { useState, useEffect, useRef } from 'react'

const STATUS_LABELS = {
  pending:   { label: 'Pending',    color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  reviewing: { label: 'Reviewing',  color: 'bg-blue-100 text-blue-800 border-blue-200' },
  notarized: { label: 'Notarized',  color: 'bg-purple-100 text-purple-800 border-purple-200' },
  completed: { label: 'Completed',  color: 'bg-green-100 text-green-800 border-green-200' },
}

function StatusBadge({ status }) {
  const s = STATUS_LABELS[status] || { label: status, color: 'bg-gray-100 text-gray-700' }
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.color}`}>
      {s.label}
    </span>
  )
}

function formatDate(str) {
  if (!str) return '—'
  return new Date(str).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function formatBytes(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

// ── Login screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        sessionStorage.setItem('admin_pw', password)
        onLogin(password)
      } else {
        setError('Incorrect password. Please try again.')
      }
    } catch {
      setError('Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Dickerson Mobile Notary</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Admin Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              autoFocus
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Submission detail drawer ──────────────────────────────────────────────────
function SubmissionDrawer({ submission, adminPw, onClose, onUpdated }) {
  const [uploadingFile, setUploadingFile] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef()

  const updateStatus = async (newStatus) => {
    setUpdatingStatus(true)
    setMsg('')
    try {
      await fetch(`/api/admin/submissions/${submission.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify({ status: newStatus }),
      })
      onUpdated()
      setMsg('Status updated.')
    } catch {
      setMsg('Failed to update status.')
    } finally {
      setUpdatingStatus(false)
    }
  }

  const uploadNotarized = async (file) => {
    setUploadingFile(file.name)
    setMsg('')
    const fd = new FormData()
    fd.append('document', file)
    try {
      const res = await fetch(`/api/admin/submissions/${submission.id}/notarized`, {
        method: 'POST',
        headers: { 'x-admin-password': adminPw },
        body: fd,
      })
      if (res.ok) {
        setMsg('Notarized document uploaded successfully.')
        onUpdated()
      } else {
        const data = await res.json()
        setMsg(data.error || 'Upload failed.')
      }
    } catch {
      setMsg('Network error during upload.')
    } finally {
      setUploadingFile(null)
    }
  }

  const deleteSubmission = async () => {
    if (!window.confirm('Delete this submission? This cannot be undone.')) return
    await fetch(`/api/admin/submissions/${submission.id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': adminPw },
    })
    onUpdated()
    onClose()
  }

  /** Build download href: Vercel Blob URLs are direct; local files go via the API. */
  const fileHref = (storedName) =>
    storedName.startsWith('http')
      ? storedName                                      // Vercel Blob CDN (prod)
      : `/api/files/${storedName}?admin_pw=${adminPw}` // local dev

  const originalDocs = submission.documents?.filter(d => d.doc_type === 'original') || []
  const notarizedDocs = submission.documents?.filter(d => d.doc_type === 'notarized') || []

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" onClick={onClose}>
      <div
        className="bg-white w-full max-w-2xl h-full overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">{submission.client_name}</h2>
            <p className="text-sm text-gray-500">{submission.client_email}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {msg && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
              {msg}
            </div>
          )}

          {/* Client info */}
          <div className="bg-gray-50 rounded-xl p-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <StatusBadge status={submission.status} />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Service</span>
              <span className="font-medium text-gray-900">{submission.service_type}</span>
            </div>
            {submission.company && (
              <div className="flex justify-between">
                <span className="text-gray-500">Company</span>
                <span className="font-medium text-gray-900">{submission.company}</span>
              </div>
            )}
            {submission.client_phone && (
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <a href={`tel:${submission.client_phone}`} className="text-blue-700 font-medium">
                  {submission.client_phone}
                </a>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Submitted</span>
              <span className="text-gray-800">{formatDate(submission.submitted_at)}</span>
            </div>
            {submission.notes && (
              <div className="pt-2 border-t border-gray-200">
                <p className="text-gray-500 mb-1">Notes</p>
                <p className="text-gray-800 whitespace-pre-wrap">{submission.notes}</p>
              </div>
            )}
          </div>

          {/* Status controls */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(STATUS_LABELS).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => updateStatus(key)}
                  disabled={updatingStatus || submission.status === key}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors disabled:opacity-50 ${
                    submission.status === key
                      ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-default'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          {/* Client's uploaded documents */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Client Documents ({originalDocs.length})
            </h3>
            {originalDocs.length === 0 ? (
              <p className="text-gray-500 text-sm">No documents uploaded.</p>
            ) : (
              <div className="space-y-2">
                {originalDocs.map(doc => (
                  <div key={doc.id} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <div className="w-9 h-9 bg-orange-100 text-orange-700 rounded-md flex items-center justify-center text-xs font-bold shrink-0">
                      {doc.original_name.split('.').pop().toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{doc.original_name}</p>
                      <p className="text-xs text-gray-500">{formatBytes(doc.size_bytes)} · {formatDate(doc.uploaded_at)}</p>
                    </div>
                    <a
                      href={fileHref(doc.stored_name)}
                      download={doc.original_name}
                      className="text-blue-700 hover:text-blue-800 text-sm font-semibold"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload notarized doc */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Upload Notarized Document
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Upload the notarized version here. The client will be able to download it from their tracking page.
            </p>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.tiff,.tif,.webp,.doc,.docx"
              onChange={e => { if (e.target.files[0]) uploadNotarized(e.target.files[0]); e.target.value = '' }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={!!uploadingFile}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-bold px-5 py-3 rounded-lg text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {uploadingFile ? `Uploading ${uploadingFile}...` : 'Upload Notarized Document'}
            </button>
          </div>

          {/* Notarized docs */}
          {notarizedDocs.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Notarized Documents ({notarizedDocs.length})
              </h3>
              <div className="space-y-2">
                {notarizedDocs.map(doc => (
                  <div key={doc.id} className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <div className="w-9 h-9 bg-green-100 text-green-700 rounded-md flex items-center justify-center text-xs font-bold shrink-0">
                      {doc.original_name.split('.').pop().toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{doc.original_name}</p>
                      <p className="text-xs text-gray-500">{formatBytes(doc.size_bytes)} · {formatDate(doc.uploaded_at)}</p>
                    </div>
                    <a
                      href={fileHref(doc.stored_name)}
                      download={doc.original_name}
                      className="text-green-700 hover:text-green-800 text-sm font-semibold"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Danger zone */}
          <div className="border-t border-gray-200 pt-5">
            <button
              onClick={deleteSubmission}
              className="text-red-600 hover:text-red-800 text-sm font-medium underline"
            >
              Delete this submission
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Admin Dashboard ──────────────────────────────────────────────────────
export default function Admin() {
  const [adminPw, setAdminPw] = useState(() => sessionStorage.getItem('admin_pw') || '')
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [detailData, setDetailData] = useState(null)

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { 'x-admin-password': adminPw },
      })
      if (res.ok) setSubmissions(await res.json())
    } finally {
      setLoading(false)
    }
  }

  const openSubmission = async (id) => {
    setSelected(id)
    const res = await fetch(`/api/admin/submissions/${id}`, {
      headers: { 'x-admin-password': adminPw },
    })
    if (res.ok) setDetailData(await res.json())
  }

  const handleUpdated = async () => {
    await fetchSubmissions()
    if (selected) {
      const res = await fetch(`/api/admin/submissions/${selected}`, {
        headers: { 'x-admin-password': adminPw },
      })
      if (res.ok) setDetailData(await res.json())
    }
  }

  useEffect(() => {
    if (adminPw) fetchSubmissions()
  }, [adminPw])

  if (!adminPw) {
    return <LoginScreen onLogin={pw => setAdminPw(pw)} />
  }

  const filtered = submissions.filter(s => {
    const matchStatus = filterStatus === 'all' || s.status === filterStatus
    const q = search.toLowerCase()
    const matchSearch = !q || s.client_name.toLowerCase().includes(q) || s.client_email.toLowerCase().includes(q) || (s.company || '').toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const counts = Object.keys(STATUS_LABELS).reduce((acc, k) => {
    acc[k] = submissions.filter(s => s.status === k).length
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-700 rounded-md flex items-center justify-center text-white text-sm font-bold">N</div>
            <span className="font-bold text-gray-900">Notary Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchSubmissions}
              className="text-sm text-blue-700 hover:text-blue-800 font-medium"
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={() => { sessionStorage.removeItem('admin_pw'); setAdminPw('') }}
              className="text-sm text-gray-500 hover:text-gray-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(STATUS_LABELS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
              className={`bg-white border rounded-xl p-4 text-left transition-all hover:shadow-md ${
                filterStatus === key ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
              }`}
            >
              <p className="text-3xl font-bold text-gray-900">{counts[key] || 0}</p>
              <StatusBadge status={key} />
            </button>
          ))}
        </div>

        {/* Search + filter bar */}
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses ({submissions.length})</option>
            {Object.entries(STATUS_LABELS).map(([key, val]) => (
              <option key={key} value={key}>{val.label} ({counts[key] || 0})</option>
            ))}
          </select>
        </div>

        {/* Submissions table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {loading && submissions.length === 0 ? (
            <div className="text-center py-16 text-gray-500">Loading submissions...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              {submissions.length === 0 ? 'No submissions yet.' : 'No submissions match your filters.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Client</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Service</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Docs</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Submitted</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map(sub => (
                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">{sub.client_name}</p>
                        <p className="text-gray-500 text-xs">{sub.client_email}</p>
                        {sub.company && <p className="text-gray-400 text-xs">{sub.company}</p>}
                      </td>
                      <td className="px-4 py-4 text-gray-700">{sub.service_type}</td>
                      <td className="px-4 py-4">
                        <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {sub.doc_count} file{sub.doc_count !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-4 py-4"><StatusBadge status={sub.status} /></td>
                      <td className="px-4 py-4 text-gray-500 text-xs whitespace-nowrap">{formatDate(sub.submitted_at)}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => openSubmission(sub.id)}
                          className="text-blue-700 hover:text-blue-800 font-semibold text-sm"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Drawer */}
      {selected && detailData && (
        <SubmissionDrawer
          submission={detailData}
          adminPw={adminPw}
          onClose={() => { setSelected(null); setDetailData(null) }}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  )
}
