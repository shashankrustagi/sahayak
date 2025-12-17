import { EmergencyRequest } from '@/types/emergency'

export const mockEmergencies: EmergencyRequest[] = []

export const responderAvailability: Record<string, boolean> = {
  DOCTOR: false,
  ELECTRICIAN: false,
}
