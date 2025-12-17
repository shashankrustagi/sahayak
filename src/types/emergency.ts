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

// 🔹 Severity levels
export type EmergencySeverity =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL'

// 🔹 EmergencyType (CONFIG / TAXONOMY)
export interface EmergencyType {
  id: string
  domain: EmergencyDomain
  title: string
  description: string
  responders: EmergencyResponder[]
  severity: EmergencySeverity
}

// 🔹 Emergency lifecycle
export type EmergencyStatus =
  | 'OPEN'
  | 'ASSIGNED'
  | 'RESOLVED'

// 🔹 Runtime emergency request
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
  assignedTo?: {
    role: EmergencyResponder
    responderId: string
  }
}
