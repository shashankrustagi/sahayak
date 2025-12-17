import { NextResponse } from 'next/server'
import { EMERGENCIES } from '@/config/emergencies'
import { mockEmergencies } from '@/lib/mock-data'
import { EmergencyRequest } from '@/types/emergency'
import { supabase } from '@/lib/realtime/client'

export async function POST(req: Request) {
  const body = await req.json()
  const { emergencyTypeId, lat, lng } = body

  const emergencyType = EMERGENCIES.find(
    (e) => e.id === emergencyTypeId
  )

  if (!emergencyType) {
    return NextResponse.json(
      { error: 'Invalid emergency type' },
      { status: 400 }
    )
  }

  const newEmergency: EmergencyRequest = {
    id: crypto.randomUUID(),
    emergencyTypeId: emergencyType.id,
    domain: emergencyType.domain,
    title: emergencyType.title,
    lat,
    lng,
    status: 'OPEN',
    createdAt: new Date().toISOString(),
  }

  // in-memory store (STEP 4)
  mockEmergencies.push(newEmergency)

  console.log('🚨 New Emergency Created:', newEmergency)

  // realtime broadcast
  await supabase.channel('emergencies').send({
    type: 'broadcast',
    event: 'EMERGENCY_CREATED',
    payload: newEmergency,
  })

  return NextResponse.json({ success: true, emergency: newEmergency })
}
