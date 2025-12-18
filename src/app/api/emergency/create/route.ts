import { NextResponse } from 'next/server'
import { EMERGENCIES } from '@/config/emergencies'
import { emergencyRepo } from '@/lib/repositories'
import { supabase } from '@/lib/realtime/client'
import { EmergencyRequest } from '@/types/emergency'

export async function POST(req: Request) {
  const body = await req.json()

  const {
    emergencyTypeId,
    lat,
    lng,
    locationAccuracy,
    locationSource,
    phoneNumber,
  } = body

  if (!phoneNumber || !lat || !lng) {
    return NextResponse.json(
      { error: 'Phone number and location are required' },
      { status: 400 }
    )
  }

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
    locationAccuracy,
    locationSource,

    phoneNumber,

    status: 'OPEN',
    createdAt: new Date().toISOString(),
  }

  await emergencyRepo.create(newEmergency)

  // 🔴 REALTIME BROADCAST (NO PHONE SHARED)
  await supabase.channel('emergencies').send({
    type: 'broadcast',
    event: 'EMERGENCY_CREATED',
    payload: {
      id: newEmergency.id,
      emergencyTypeId: newEmergency.emergencyTypeId,
      domain: newEmergency.domain,
      title: newEmergency.title,
      lat: newEmergency.lat,
      lng: newEmergency.lng,
      status: newEmergency.status,
      createdAt: newEmergency.createdAt,
    },
  })

  return NextResponse.json({
    success: true,
    emergencyId: newEmergency.id,
  })
}
