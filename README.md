# Mrityunjay Pandey — Portfolio (Monorepo)

This monorepo contains a Next.js frontend and an Express.js backend for a professional, modular portfolio aimed at internship applications.

- Frontend: `frontend/` (Next.js pages router, Tailwind CSS)
- Backend: `backend/` (Express, MongoDB via Mongoose, JWT auth)

See `frontend/README.md` and `backend/README.md` for service-specific instructions.

## Quick start

- Add `frontend/public/resume.pdf` (placeholder for now)
- Install and run each app as described in their READMEs

## Environments

Backend requires: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `ADMIN_EMAIL` (optional), `PORT`.

Refer to `backend/config/env.example`.

## Deployment (Separate Frontend + Backend)

1. Deploy `backend/` as a Node web service.
2. Set backend env vars: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `ADMIN_EMAIL`, `PORT`, `CORS_ORIGINS`.
3. Verify backend health at `/api/health`.
4. Deploy `frontend/` as a Next.js app.
5. Set frontend env var: `NEXT_PUBLIC_API_BASE` to your backend URL.
6. Redeploy frontend after env var updates.

