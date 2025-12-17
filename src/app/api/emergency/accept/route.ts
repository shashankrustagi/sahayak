import { NextResponse } from 'next/server'
import { mockEmergencies } from '@/lib/mock-data'
import { EmergencyResponder } from '@/types/emergency'
import { supabase } from '@/lib/realtime/client'

export async function POST(req: Request) {
  const { emergencyId, responderRole = 'DOCTOR' } = await req.json()

  const emergency = mockEmergencies.find(
    (e) => e.id === emergencyId
  )

  // ❌ not found
  if (!emergency) {
    return NextResponse.json(
      { error: 'Emergency not found' },
      { status: 404 }
    )
  }

  // 🔐 already assigned
  if (emergency.status !== 'OPEN') {
    return NextResponse.json(
      { error: 'Emergency already accepted' },
      { status: 409 }
    )
  }

  // ✅ atomic assignment
  emergency.status = 'ASSIGNED'
  emergency.assignedTo = {
    role: responderRole as EmergencyResponder,
    responderId: crypto.randomUUID(), // later from auth
  }
  emergency.updatedAt = new Date().toISOString()

  // 🔔 realtime notify others
  await supabase.channel('emergencies').send({
    type: 'broadcast',
    event: 'EMERGENCY_ASSIGNED',
    payload: emergency,
  })

  return NextResponse.json({
    success: true,
    emergency,
  })
}
