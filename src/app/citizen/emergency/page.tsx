'use client'

import { useEffect, useState } from 'react'
import { EMERGENCIES } from '@/config/emergencies'

export default function CitizenEmergencyPage() {
  const [selected, setSelected] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const [location, setLocation] = useState<{
    lat: number
    lng: number
    accuracy: number
  } | null>(null)

  // 📍 Fetch GPS location on page load
  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('Geolocation not supported on this device.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy),
        })
      },
      () => {
        setStatus(
          'Location permission denied. Please enable GPS to continue.'
        )
      },
      { enableHighAccuracy: true }
    )
  }, [])

  async function createEmergency() {
    if (!selected || !phone || !location) {
      setStatus('Please complete all required fields.')
      return
    }

    setLoading(true)
    setStatus('')

    const res = await fetch('/api/emergency/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emergencyTypeId: selected,
        phoneNumber: phone,
        lat: location.lat,
        lng: location.lng,
        locationAccuracy: location.accuracy,
        locationSource: 'GPS',
      }),
    })

    if (res.ok) {
      setStatus(
        'Emergency request successfully created. Please stay available.'
      )
      setSelected('')
      setPhone('')
    } else {
      setStatus('Failed to create emergency. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Request Emergency Help
      </h1>

      <div className="space-y-4">
        {/* Emergency Type */}
        <select
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select Emergency Type</option>
          {EMERGENCIES.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          ))}
        </select>

        {/* Phone Number */}
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Location Status */}
        <div className="text-sm text-gray-600">
          {location ? (
            <>Location detected (±{location.accuracy}m)</>
          ) : (
            <>Detecting location…</>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={createEmergency}
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded font-medium disabled:opacity-50"
        >
          {loading ? 'Submitting…' : '🚨 Create Emergency'}
        </button>

        {/* Status */}
        {status && (
          <p className="text-sm text-gray-700">{status}</p>
        )}
      </div>
    </div>
  )
}
