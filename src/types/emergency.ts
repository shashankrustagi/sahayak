// 🔹 Emergency domain/category
export type EmergencyDomain =
  | 'INFRASTRUCTURE'
  | 'DISASTER'
  | 'ACCIDENT'
  | 'HEALTH'
  | 'TRAVEL'
  | 'SECURITY'
  | 'CRIME'

// 🔹 Who can respond
export type EmergencyResponder =
  | 'ELECTRICIAN'
  | 'PLUMBER'
  | 'GAS_TECHNICIAN'
  | 'AMBULANCE'
  | 'DOCTOR'
  | 'NURSE'
  | 'HOSPITAL'
  | 'FIRE'
  | 'POLICE'
  | 'DISASTER_RESPONSE'
  | 'ADMIN'
  | 'VOLUNTEER'
  | 'NGO'

// 🔹 Lifecycle state
export type EmergencyStatus =
  | 'OPEN'
  | 'ASSIGNED'
  | 'RESOLVED'

// 🔹 Core emergency model
export interface EmergencyRequest {
  id: string
  emergencyTypeId: string
  domain: EmergencyDomain
  title: string
  lat: number
  lng: number

  status: EmergencyStatus

  createdAt: string
  updatedAt?: string

  // assigned responder (once accepted)
  assignedTo?: {
    role: EmergencyResponder
    responderId: string
  }
}
