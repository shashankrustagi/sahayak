import { NextResponse } from 'next/server'
import { responderAvailability } from '@/lib/mock-data'

export async function POST(req: Request) {
  const { role, available } = await req.json()

  if (!role) {
    return NextResponse.json({ error: 'Role required' }, { status: 400 })
  }

  responderAvailability[role] = available

  console.log(`🟢 ${role} availability:`, available)

  return NextResponse.json({ success: true })
}

export async function GET() {
  return NextResponse.json(responderAvailability)
}
