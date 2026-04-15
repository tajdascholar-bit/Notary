import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

const SERVICE_TYPES = [
  'Real Estate Closing',
  'Legal Documents',
  'Loan Signing',
  'Corporate / Business Documents',
  'Power of Attorney',
  'Affidavit / Sworn Statement',
  'Will / Trust Documents',
  'Other',
]

const MAX_FILES = 10
const MAX_MB = 20
const ACCEPTED = '.pdf,.jpg,.jpeg,.png,.tiff,.tif,.webp,.doc,.docx'

function FileItem({ file, onRemove }) {
  const ext = file.name.split('.').pop().toUpperCase()
  const sizeMB = (file.size / 1024 / 1024).toFixed(2)
  return (
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
      <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-md flex items-center justify-center text-xs font-bold shrink-0">
        {ext}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
        <p className="text-xs text-gray-500">{sizeMB} MB</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove file"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default function Upload() {
  const [fields, setFields] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    company: '',
    service_type: '',
    notes: '',
  })
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState('idle') // idle | uploading | success | error
  const [submissionId, setSubmissionId] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const inputRef = useRef()

  const handleField = (e) => {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const addFiles = useCallback((incoming) => {
    const valid = []
    const oversized = []
    Array.from(incoming).forEach(f => {
      if (f.size > MAX_MB * 1024 * 1024) {
        oversized.push(f.name)
      } else {
        valid.push(f)
      }
    })
    if (oversized.length) {
      setErrorMsg(`These files exceed the ${MAX_MB} MB limit and were skipped: ${oversized.join(', ')}`)
    } else {
      setErrorMsg('')
    }
    setFiles(prev => {
      const combined = [...prev, ...valid]
      return combined.slice(0, MAX_FILES)
    })
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }, [addFiles])

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = () => setDragging(false)

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (files.length === 0) {
      setErrorMsg('Please upload at least one document.')
      return
    }

    setStatus('uploading')
    setUploadProgress(0)
    setErrorMsg('')

    const formData = new FormData()
    Object.entries(fields).forEach(([k, v]) => formData.append(k, v))
    files.forEach(f => formData.append('documents', f))

    try {
      // Simulate progress with XHR so we get real upload progress
      const id = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/submissions')
        xhr.upload.onprogress = (evt) => {
          if (evt.lengthComputable) {
            setUploadProgress(Math.round((evt.loaded / evt.total) * 100))
          }
        }
        xhr.onload = () => {
          if (xhr.status === 201) {
            resolve(JSON.parse(xhr.responseText).id)
          } else {
            try {
              reject(new Error(JSON.parse(xhr.responseText).error || 'Upload failed'))
            } catch {
              reject(new Error('Upload failed'))
            }
          }
        }
        xhr.onerror = () => reject(new Error('Network error. Please try again.'))
        xhr.send(formData)
      })

      setSubmissionId(id)
      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Documents Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your documents have been securely uploaded. We&apos;ll review and notarize them and
            send them back to <strong>{fields.client_email}</strong>.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 text-left">
            <p className="text-sm font-semibold text-blue-900 mb-2">Your Submission ID</p>
            <p className="font-mono text-blue-800 text-sm break-all">{submissionId}</p>
            <p className="text-xs text-blue-600 mt-2">
              Save this ID — you can use it along with your email to track your submission status.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to={`/track?id=${submissionId}&email=${encodeURIComponent(fields.client_email)}`}
              className="block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Track My Submission
            </Link>
            <button
              onClick={() => {
                setStatus('idle')
                setFiles([])
                setFields({ client_name: '', client_email: '', client_phone: '', company: '', service_type: '', notes: '' })
                setSubmissionId(null)
              }}
              className="block text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors"
            >
              Submit Another Document
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <div className="max-w-2xl">
            <p className="text-blue-300 font-semibold uppercase tracking-widest text-sm mb-3">
              Submit Documents
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upload Documents for Notarization
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Securely upload your documents and we&apos;ll notarize them and send them back to you.
              Most documents are returned within 1–2 business days.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info sidebar */}
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="font-bold text-blue-900 mb-3">How It Works</h3>
              <ol className="space-y-3">
                {[
                  'Upload your documents below',
                  'We review and notarize them',
                  'Download the notarized copies',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-blue-800">
                    <span className="w-6 h-6 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                <p className="font-semibold text-green-900 text-sm">Turnaround Time</p>
              </div>
              <p className="text-green-800 text-sm">
                Most documents are notarized and returned within <strong>1–2 business days</strong>.
                Rush same-day service available — mention it in your notes.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600 space-y-2">
              <p className="font-semibold text-gray-800">Accepted Formats</p>
              <p>PDF, JPG, PNG, TIFF, DOC, DOCX</p>
              <p className="font-semibold text-gray-800 mt-3">Max File Size</p>
              <p>20 MB per file — up to 10 files</p>
              <p className="font-semibold text-gray-800 mt-3">Security</p>
              <p>All documents are stored securely and accessible only by you and our notary team.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Contact info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Your Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="client_name"
                    required
                    value={fields.client_name}
                    onChange={handleField}
                    placeholder="Jane Smith"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="client_email"
                    required
                    value={fields.client_email}
                    onChange={handleField}
                    placeholder="jane@example.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    name="client_phone"
                    value={fields.client_phone}
                    onChange={handleField}
                    placeholder="(713) 000-0000"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company / Firm</label>
                  <input
                    type="text"
                    name="company"
                    value={fields.company}
                    onChange={handleField}
                    placeholder="Optional"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Service Needed <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service_type"
                    required
                    value={fields.service_type}
                    onChange={handleField}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select a service...</option>
                    {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes / Special Instructions</label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={fields.notes}
                    onChange={handleField}
                    placeholder="E.g. Rush order, specific notary language required, multiple signers..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Document upload */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Upload Documents</h2>
              <p className="text-sm text-gray-500 mb-5">PDF, JPG, PNG, TIFF, DOC, DOCX — up to 20 MB each, 10 files max</p>

              {/* Drop zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => inputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                  dragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
              >
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p className="font-semibold text-gray-700">Drop files here or click to browse</p>
                <p className="text-sm text-gray-500 mt-1">Select up to {MAX_FILES} documents</p>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept={ACCEPTED}
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-semibold text-gray-700">{files.length} file{files.length > 1 ? 's' : ''} selected:</p>
                  {files.map((f, i) => (
                    <FileItem key={`${f.name}-${i}`} file={f} onRemove={() => removeFile(i)} />
                  ))}
                </div>
              )}

              {/* Error */}
              {errorMsg && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}
            </div>

            {/* Upload progress */}
            {status === 'uploading' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-900">Uploading...</span>
                  <span className="text-sm text-blue-700">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'uploading'}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl text-lg transition-colors"
            >
              {status === 'uploading' ? 'Uploading...' : 'Submit Documents for Notarization'}
            </button>
            <p className="text-center text-gray-500 text-xs">
              Your documents are encrypted in transit and stored securely. Only our notary team can access them.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
