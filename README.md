# Habits App

This repository contains a minimal full stack setup for a habits tracking application.

- **frontend**: Next.js + React application.
- **backend**: Python FastAPI API server.

## Running Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Running Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend to be running at `http://localhost:8000`.
