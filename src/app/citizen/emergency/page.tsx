'use client'

import { useState } from 'react'
import { EMERGENCIES } from '@/config/emergencies'

export default function CitizenEmergencyPage() {
  const [selected, setSelected] = useState('')
  const [status, setStatus] = useState('')

  async function createEmergency() {
    if (!selected) return

    const res = await fetch('/api/emergency/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emergencyTypeId: selected,
        lat: 28.6139, // mock Delhi lat
        lng: 77.209,  // mock Delhi lng
      }),
    })

    if (res.ok) {
      setStatus('Emergency created successfully 🚨')
    }
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Request Emergency Help</h1>

      <select
        className="border p-2 w-full"
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

      <button
        onClick={createEmergency}
        className="mt-4 bg-red-600 text-white p-3 w-full"
      >
        🚨 Create Emergency
      </button>

      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  )
}
