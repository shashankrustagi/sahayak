import { EmergencyDomain, EmergencyResponder } from '@/types/emergency'

export const EMERGENCIES: EmergencyType[] = [
  // 🟡 INFRASTRUCTURE
  {
    id: 'POWER_FAILURE',
    domain: 'INFRASTRUCTURE',
    title: 'Power Failure',
    description: 'No electricity in home / hospital / area',
    responders: ['ELECTRICIAN', 'ADMIN'],
    severity: 'HIGH',
  },
  {
    id: 'GAS_LEAK',
    domain: 'INFRASTRUCTURE',
    title: 'Cooking Gas Leak',
    description: 'Gas leakage detected',
    responders: ['GAS_TECHNICIAN', 'FIRE'],
    severity: 'CRITICAL',
  },
  {
    id: 'PLUMBING_FAILURE',
    domain: 'INFRASTRUCTURE',
    title: 'Water / Plumbing Failure',
    description: 'Water leakage or no water supply',
    responders: ['PLUMBER'],
    severity: 'MEDIUM',
  },

  // 🔴 DISASTER
  {
    id: 'FIRE_DISASTER',
    domain: 'DISASTER',
    title: 'Fire Emergency',
    description: 'Fire outbreak',
    responders: ['FIRE', 'POLICE', 'AMBULANCE'],
    severity: 'CRITICAL',
  },
  {
    id: 'FLOOD',
    domain: 'DISASTER',
    title: 'Flood',
    description: 'Flooding in area',
    responders: ['DISASTER_RESPONSE', 'POLICE', 'AMBULANCE'],
    severity: 'CRITICAL',
  },

  // 🚑 ACCIDENT
  {
    id: 'ROAD_ACCIDENT',
    domain: 'ACCIDENT',
    title: 'Road Accident',
    description: 'Motor vehicle accident',
    responders: ['AMBULANCE', 'POLICE', 'HOSPITAL'],
    severity: 'HIGH',
  },
  {
    id: 'RAIL_ACCIDENT',
    domain: 'ACCIDENT',
    title: 'Rail Accident',
    description: 'Train derailment or collision',
    responders: ['DISASTER_RESPONSE', 'AMBULANCE', 'POLICE'],
    severity: 'CRITICAL',
  },

  // ❤️ HEALTH
  {
    id: 'HEART_ATTACK',
    domain: 'HEALTH',
    title: 'Heart Attack',
    description: 'Cardiac emergency',
    responders: ['AMBULANCE', 'DOCTOR', 'HOSPITAL'],
    severity: 'CRITICAL',
  },
  {
    id: 'CHILDBIRTH',
    domain: 'HEALTH',
    title: 'Emergency Childbirth',
    description: 'Labour / delivery emergency',
    responders: ['AMBULANCE', 'NURSE', 'HOSPITAL'],
    severity: 'HIGH',
  },

  // ✈️ TRAVEL
  {
    id: 'URGENT_TRAVEL',
    domain: 'TRAVEL',
    title: 'Urgent Travel Assistance',
    description: 'Cancelled flight or urgent booking',
    responders: ['ADMIN'],
    severity: 'MEDIUM',
  },

  // 🔫 SECURITY
  {
    id: 'TERROR_THREAT',
    domain: 'SECURITY',
    title: 'Terrorist Threat',
    description: 'Suspicious or terror-related activity',
    responders: ['POLICE', 'ADMIN'],
    severity: 'CRITICAL',
  },

  // 🏠 CRIME
  {
    id: 'BURGLARY',
    domain: 'CRIME',
    title: 'Burglary / Theft',
    description: 'Break-in or theft',
    responders: ['POLICE'],
    severity: 'HIGH',
  },
]

// 🔹 Severity levels for emergency types
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

