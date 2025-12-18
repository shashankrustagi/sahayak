# SAHAYAK

**Real-time Emergency Coordination System**

SAHAYAK is a pilot-stage emergency coordination platform that connects citizens with nearby and available responders including doctors, hospitals, electricians, police, fire services, and disaster response teams. The system addresses coordination and visibility gaps that often cause delayed or ineffective emergency response.

## Overview

Traditional emergency systems rely on static call centers and fragmented workflows. SAHAYAK reimagines emergency response as a real-time coordination problem, similar to modern dispatch or logistics platforms, but applied to public safety use cases.

**Key Features:**
- Citizens report emergencies once without needing to know which service to contact
- Intelligent routing to appropriate responders based on emergency type
- Real-time dashboard updates for coordinated response
- GPS-based location tracking with accuracy metadata
- Role-based access control for responders
- Atomic assignment to prevent duplicate responses

## Architecture

SAHAYAK follows a clean separation of concerns with distinct layers:

- **Frontend & API Layer**: Next.js
- **Database**: PostgreSQL (via Prisma ORM)
- **Real-time Coordination**: Supabase Realtime
- **Styling**: Tailwind CSS
- **Runtime**: Node.js

## How It Works

### For Citizens

1. Access the simple web interface (no registration required)
2. Report an emergency with GPS location
3. Provide phone number for follow-up
4. System automatically routes to appropriate responders

### For Responders

1. Access role-based dashboard
2. View emergencies relevant to your domain
3. Toggle availability status
4. Accept emergencies with a single action
5. Receive real-time updates on new emergencies

### Emergency Lifecycle

Emergencies follow a clear three-state lifecycle:

1. **OPEN** - Emergency created, awaiting responder
2. **ASSIGNED** - Responder has accepted the emergency
3. **RESOLVED** - Emergency has been handled

## Emergency Classification

Emergencies are organized by domain:

- Health
- Infrastructure
- Disaster
- Accident
- Security

## Technical Highlights

- **Atomic Assignment**: Database-level enforcement ensures only one responder can accept each emergency
- **Centralized Truth**: PostgreSQL acts as single source of truth for all emergency records
- **Real-time Sync**: Dashboards stay synchronized through event-based updates
- **Privacy-First**: Sensitive data shared only after responder assignment
- **Server-side Authorization**: Security enforced at API boundaries

## Development Setup

SAHAYAK is designed to run locally using Supabase's local development environment:
```bash
# Install dependencies
npm install

# Start Supabase local development
supabase start

# Run development server
npm run dev

# Build for production
npm run build
```

## Authentication (Pilot Phase)

Authentication is intentionally stubbed in this pilot phase:

- **Citizens**: No registration required for emergency reporting
- **Responders**: Pre-verified by respective departments (no self-registration)
- **Production Plan**: 
  - Citizens: OTP-based phone authentication
  - Responders: Government-approved identity systems (NIC Single Sign-On or department-issued credentials)

The authentication layer is designed to be pluggable without requiring changes to core emergency coordination logic.

## Scope & Future Roadmap

### Current Pilot Scope

This submission represents a proof-of-concept focused on:
- Core emergency coordination workflow
- Real-time responder dashboards
- Database integrity and auditability
- Clean upgrade path for production deployment

### Out of Scope (Future Phases)

- Production-grade authentication
- Government identity integrations
- Analytics dashboards
- Payment systems
- AI-based decision support
- District/state/national scaling

These capabilities are planned for later stages to avoid premature complexity and align with government deployment requirements.

## Core Principles

1. **Coordination Over Resources**: Focus on solving visibility gaps, not resource shortages
2. **Simplicity First**: Minimal friction during critical situations
3. **Auditability**: Complete emergency lifecycle tracking
4. **Graceful Degradation**: System recovers even if real-time delivery fails
5. **Privacy & Security**: Role-based access with server-side enforcement
6. **Scalable Foundation**: Architecture ready for district, state, and national deployment

## Use Cases

- Medical emergencies requiring immediate doctor/hospital response
- Infrastructure failures (electrical, water, gas)
- Natural disasters and coordinated rescue operations
- Traffic accidents requiring police and medical services
- Security incidents requiring law enforcement
- Fire emergencies

## Contributing

This is a pilot project. For production deployment considerations, please coordinate with relevant government departments and identity verification systems.

## License

[Add appropriate license information]

---

**SAHAYAK** - Improving emergency response through real-time coordination, visibility, and role-based workflows.