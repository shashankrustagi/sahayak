'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/realtime/client'

export default function DoctorDashboard() {
  const [available, setAvailable] = useState(false)
  const [emergencies, setEmergencies] = useState<any[]>([])
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function toggleAvailability(val: boolean) {
    setAvailable(val)
    await fetch('/api/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'DOCTOR', available: val }),
    })
  }

  async function loadEmergencies() {
    const res = await fetch('/api/emergency/list')
    const data = await res.json()
    setEmergencies(data)
  }

  async function acceptEmergency(emergencyId: string) {
    setLoadingId(emergencyId)

    await fetch('/api/emergency/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emergencyId,
        responderRole: 'DOCTOR'
        ,
}),
    })

    // remove accepted emergency from list
    setEmergencies((prev) =>
      prev.filter((e) => e.id !== emergencyId)
    )

    setLoadingId(null)
  }

useEffect(() => {
  loadEmergencies()

  const channel = supabase
    .channel('emergencies')

    // when a new emergency is created
    .on(
      'broadcast',
      { event: 'EMERGENCY_CREATED' },
      ({ payload }) => {
        setEmergencies((prev) => [payload, ...prev])
      }
    )

    // when someone else accepts it
    .on(
      'broadcast',
      { event: 'EMERGENCY_ASSIGNED' },
      ({ payload }) => {
        setEmergencies((prev) =>
          prev.filter((e) => e.id !== payload.id)
        )
      }
    )

    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Doctor Dashboard</h1>

      <div className="mt-4">
        <button
          onClick={() => toggleAvailability(!available)}
          className={`px-4 py-2 rounded ${
            available ? 'bg-green-600' : 'bg-gray-400'
          } text-white`}
        >
          {available ? 'Available' : 'Unavailable'}
        </button>
      </div>

      <h2 className="mt-6 font-semibold">Open Emergencies</h2>

      <ul className="mt-2 space-y-3">
        {emergencies.map((e) => (
          <li
            key={e.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              🚨 <b>{e.title}</b>
              <div className="text-sm text-gray-600">
                Domain: {e.domain}
              </div>
            </div>

            <button
              disabled={loadingId === e.id}
              onClick={() => acceptEmergency(e.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {loadingId === e.id ? 'Accepting...' : 'Accept'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
