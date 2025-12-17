import { NextResponse } from 'next/server'
import { mockEmergencies } from '@/lib/mock-data'

export async function POST(req: Request) {
  const { emergencyId, role, responderId } = await req.json()

  const emergency = mockEmergencies.find((e) => e.id === emergencyId)

  if (!emergency) {
    return NextResponse.json(
      { error: 'Emergency not found' },
      { status: 404 }
    )
  }

  if (emergency.status !== 'OPEN') {
    return NextResponse.json(
      { error: 'Emergency already assigned' },
      { status: 409 }
    )
  }

  emergency.status = 'ASSIGNED'
  emergency.assignedTo = {
    role,
    responderId,
  }
  emergency.updatedAt = new Date().toISOString()

  console.log('✅ Emergency assigned:', emergency)

  return NextResponse.json({ success: true, emergency })
}
