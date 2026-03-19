# Backend (Express + MongoDB)

## Env Variables

Create `.env` (copy from `config/env.example`):

- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `ADMIN_EMAIL` (optional)
- `PORT`
- `CORS_ORIGINS` (comma-separated frontend origins)

## Setup

```bash
cd backend
npm install
cp config/env.example .env # Windows: copy .\config\env.example .\.env
```

## Development

```bash
npm run dev
```

## Seed (DEV ONLY)

Creates default admin and sample projects:

```bash
npm run seed
```

- Default admin: username `admin`, password `ChangeMe123!` (change immediately in production)

## Start

```bash
npm start
```

## Deploy (Render/Heroku)

- Push repo to GitHub
- Create a new Web Service (Render) or App (Heroku)
- Set environment variables: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `ADMIN_EMAIL`, `PORT`, `CORS_ORIGINS`
- Example `CORS_ORIGINS`: `https://your-frontend.vercel.app,http://localhost:3000`
- Build command: `npm install`
- Start command: `npm start`
- After deploy, verify `GET /api/health` returns `{ status: 'ok' }`

