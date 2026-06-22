# ChatFlow AI Architecture

## Overview
ChatFlow AI is a multi-tenant SaaS platform built for AI-powered WhatsApp customer support.

## Stack
- **Frontend**: React, Vite, Tailwind CSS v4, Framer Motion, Socket.io-client.
- **Backend**: Node.js, Express, TypeScript, Socket.io, Prisma ORM.
- **Database**: Neon PostgreSQL (Serverless).
- **AI**: Google Gemini 1.5 Flash.
- **Infrastructure**: Docker, GitHub Actions.

## Security Flow
1. User authenticates via `/auth/login`.
2. Backend returns JWT signed with organization metadata.
3. Frontend stores JWT and includes it in `Authorization` headers.
4. AI Service (`backend/src/services/ai.service.ts`) proxies requests to Gemini using an internal API Key.
5. All inputs validated via Zod schemas.

## Data Model
- Organizations own Agents and Conversations.
- Agents follow System Instructions (Instructions + Personality).
- Messages are persisted in PostgreSQL for history and analytics.
