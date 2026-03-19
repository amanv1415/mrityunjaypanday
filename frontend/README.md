# Frontend (Next.js + Tailwind)

## Setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

## Development

```bash
npm run dev
```

- App runs on http://localhost:3000
- Add your resume to `public/resume.pdf` (placeholder allowed)

## Build

```bash
npm run build && npm start
```

## Deploy (Vercel)

- Push repo to GitHub
- Import `frontend/` in Vercel
- Set `NEXT_PUBLIC_API_BASE` to your deployed backend URL (example: `https://your-backend.onrender.com`)
- Use default build command and output

## Separate Frontend/Backend Deployment Checklist

- Deploy backend first and confirm `GET https://your-backend-domain/api/health` returns `{ "status": "ok" }`
- Set backend `CORS_ORIGINS` to include your frontend domain (and localhost for local dev)
- Deploy frontend with `NEXT_PUBLIC_API_BASE` pointing to the backend domain
- Redeploy frontend after changing env vars in Vercel

