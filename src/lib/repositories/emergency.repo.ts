import { EmergencyRequest } from '@/types/emergency'

export interface EmergencyRepository {
  create(emergency: EmergencyRequest): Promise<EmergencyRequest>
  listOpen(): Promise<EmergencyRequest[]>
  findById(id: string): Promise<EmergencyRequest | null>
  assign(
    id: string,
    assignedTo: EmergencyRequest['assignedTo']
  ): Promise<EmergencyRequest | null>
}
