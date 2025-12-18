'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/realtime/client'
import DashboardLayout from '@/components/DashboardLayout'

export default function DoctorDashboard() {
  const [available, setAvailable] = useState(false)
  const [emergencies, setEmergencies] = useState<any[]>([])
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function toggleAvailability(val: boolean) {
    setAvailable(val)
    await fetch('/api/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: 'DOCTOR',
        available: val,
      }),
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
        responderRole: 'DOCTOR',
      }),
    })

    // optimistic removal
    setEmergencies((prev) =>
      prev.filter((e) => e.id !== emergencyId)
    )

    setLoadingId(null)
  }

  useEffect(() => {
    loadEmergencies()

    const channel = supabase
      .channel('emergencies')

      .on(
        'broadcast',
        { event: 'EMERGENCY_CREATED' },
        ({ payload }) => {
          setEmergencies((prev) => [payload, ...prev])
        }
      )

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
    <DashboardLayout
      title="Emergency Response Dashboard"
      role="Doctor"
    >
      {/* Availability */}
      <div className="mb-6">
        <button
          onClick={() => toggleAvailability(!available)}
          className={`px-4 py-2 rounded text-sm font-medium ${
            available
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-900'
          }`}
        >
          {available ? 'Available for Response' : 'Unavailable'}
        </button>
      </div>

      {/* Emergencies */}
      <h2 className="text-lg font-semibold mb-4">
        Open Emergencies
      </h2>

      {emergencies.length === 0 ? (
        <p className="text-sm text-gray-600">
          No open emergencies at the moment.
        </p>
      ) : (
        <ul className="space-y-3">
          {emergencies.map((e) => (
            <li
              key={e.id}
              className="border border-gray-200 rounded px-4 py-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-900">
                  🚨 {e.title}
                </p>
                <p className="text-sm text-gray-600">
                  Domain: {e.domain}
                </p>
              </div>

              <button
                disabled={loadingId === e.id}
                onClick={() => acceptEmergency(e.id)}
                className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
              >
                {loadingId === e.id
                  ? 'Accepting…'
                  : 'Accept'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  )
}
