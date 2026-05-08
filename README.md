# CampusHub

CampusHub is a centralized platform for college events, clubs, and student collaboration.

## Tech Stack

- Frontend: React + Tailwind CSS + Vite
- Backend: Node.js + Express.js
- Database: MongoDB
- Auth: JWT + Google OAuth (optional env-based)
- Real-time: Socket.io notifications

## Folder Structure

```text
RockVerse/
  backend/
    index.js
    src/
      app.js
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      utils/
  frontend/
    src/
      components/
      context/
      layouts/
      pages/
      services/
      utils/
```

## Setup

1. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

2. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Delivered Features

- Role-based auth (Student / Club Admin / Super Admin)
- Email/password + Google OAuth flow
- Event listing/filtering + RSVP + joined events
- Team creation/join + teammate suggestion logic
- Club announcements and registration tracking
- Super admin monitoring and engagement analytics
- Real-time notification channel (Socket.io)
- Responsive dashboard UI with light/dark mode

## Notes

- Google OAuth endpoints return `503` until OAuth env vars are configured.
- Event gallery upload endpoints are present (`multer`) and save to `/uploads`.

//Addmin
//omkarkardel175@gmail.com
//123456