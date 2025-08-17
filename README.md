# Asdium – Medium-style Blogging Platform

A clean, full-stack Medium-style clone focused on maintainability and production hygiene.

## ✨ Features (What)
- Authenticated authoring: sign in, create, edit, and publish posts
- Reader experience: home feed, profiles, and post pages
- Typed, migration-backed data model and predictable deploys

## 🧱 Tech (How)
- Frontend: Next.js (App Router) + TypeScript
- Backend/Data: Prisma ORM + PostgreSQL with relations (users, posts, follows)
- Validation: Zod-backed input parsing (server boundaries)
- Infra: environment-typed config, Prisma migrations
- DevX: scripts for generate/migrate, consistent formatting

## ✅ Status (Result)
- Live workflow: sign in → write/edit → view on feed/profile
- Reproducible: schema migrations tracked and applied via Prisma
- Maintainable: clear module layout and typed repositories

## 🗂 Structure
asdium/
├─ frontend/ # Next.js app (routes, UI)
├─ backend/ # API handlers / server logic
├─ common/ # Shared types & utilities
└─ prisma/ # Schema & migrations


## 🚀 Getting Started
1) Install
   pnpm install

2) Configure env
   cp .env.example .env
   set DATABASE_URL, etc.

3) Migrate & generate
   pnpm prisma migrate dev --name init
   pnpm prisma generate

4) Run
   pnpm dev
   http://localhost:3000

## 🔐 Environment
- DATABASE_URL=postgresql://user:pass@localhost:5432/asdium

## 📦 Scripts
- pnpm prisma migrate dev
- pnpm prisma generate
- pnpm lint
- pnpm build
- pnpm dev

## 📝 License
MIT
