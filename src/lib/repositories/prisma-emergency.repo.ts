import { prisma } from '@/lib/prisma'
import { EmergencyRepository } from './emergency.repo'
import {
  EmergencyRequest,
  EmergencyDomain,
  EmergencyStatus,
  EmergencyResponder,
} from '@/types/emergency'

export const prismaEmergencyRepo: EmergencyRepository = {
  async create(emergency) {
    await prisma.emergency.create({
      data: {
        id: emergency.id,
        emergencyTypeId: emergency.emergencyTypeId,
        domain: emergency.domain,
        title: emergency.title,
        lat: emergency.lat,
        lng: emergency.lng,
        status: emergency.status,
        createdAt: new Date(emergency.createdAt),
        updatedAt: emergency.updatedAt
          ? new Date(emergency.updatedAt)
          : null,
        assignedRole: emergency.assignedTo?.role,
        responderId: emergency.assignedTo?.responderId,
      },
    })

    return emergency
  },

  async listOpen() {
    const rows = await prisma.emergency.findMany({
      where: { status: 'OPEN' },
      orderBy: { createdAt: 'desc' },
    })

    return rows.map((e) => ({
      id: e.id,
      emergencyTypeId: e.emergencyTypeId,
      domain: e.domain as EmergencyDomain,
      title: e.title,
      lat: e.lat,
      lng: e.lng,
      status: e.status as EmergencyStatus,
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt?.toISOString(),
      assignedTo: e.assignedRole
        ? {
            role: e.assignedRole as EmergencyResponder,
            responderId: e.responderId!,
          }
        : undefined,
    }))
  },

  async findById(id) {
    const e = await prisma.emergency.findUnique({
      where: { id },
    })
    if (!e) return null

    return {
      id: e.id,
      emergencyTypeId: e.emergencyTypeId,
      domain: e.domain as EmergencyDomain,
      title: e.title,
      lat: e.lat,
      lng: e.lng,
      status: e.status as EmergencyStatus,
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt?.toISOString(),
      assignedTo: e.assignedRole
        ? {
            role: e.assignedRole as EmergencyResponder,
            responderId: e.responderId!,
          }
        : undefined,
    }
  },

  async assign(id, assignedTo) {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.emergency.findUnique({
        where: { id },
      })

      if (!existing || existing.status !== 'OPEN') {
        return null
      }

      const updated = await tx.emergency.update({
        where: { id },
        data: {
          status: 'ASSIGNED',
          assignedRole: assignedTo?.role,
          responderId: assignedTo?.responderId,
          updatedAt: new Date(),
        },
      })

      return {
        id: updated.id,
        emergencyTypeId: updated.emergencyTypeId,
        domain: updated.domain as EmergencyDomain,
        title: updated.title,
        lat: updated.lat,
        lng: updated.lng,
        status: updated.status as EmergencyStatus,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt?.toISOString(),
        assignedTo: updated.assignedRole
          ? {
              role: updated.assignedRole as EmergencyResponder,
              responderId: updated.responderId!,
            }
          : undefined,
      }
    })
  },
}
