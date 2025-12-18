import { NextResponse } from 'next/server'
import { emergencyRepo } from '@/lib/repositories'

export async function GET() {
  const emergencies = await emergencyRepo.listOpen()

  return NextResponse.json(
    emergencies.map((e) => ({
      id: e.id,
      emergencyTypeId: e.emergencyTypeId,
      domain: e.domain,
      title: e.title,
      lat: e.lat,
      lng: e.lng,
      status: e.status,
      createdAt: e.createdAt,
    }))
  )
}
