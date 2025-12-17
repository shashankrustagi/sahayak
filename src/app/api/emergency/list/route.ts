import { NextResponse } from 'next/server'
import { mockEmergencies } from '@/lib/mock-data'

export async function GET() {
  const openEmergencies = mockEmergencies.filter(
    (e) => e.status === 'OPEN'
  )

  return NextResponse.json(openEmergencies)
}
