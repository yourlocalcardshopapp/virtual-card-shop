# Virtual Card Shop

A full-stack web application for managing and trading virtual trading cards.

## Project Overview

This is a modern web application built with:
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript + Prisma
- **Database**: PostgreSQL

## Features

- Browse virtual card collections
- Create and manage trading card decks
- Trade cards with other users
- User authentication and profiles
- Real-time card marketplace

## Project Structure

```
virtual-card-shop/
├── backend/          # Express server & API
├── frontend/         # React application
├── package.json      # Root configuration
└── README.md         # This file
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 12.0

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourlocalcardshopapp/virtual-card-shop.git
cd virtual-card-shop
```

2. Install dependencies
```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

3. Set up environment variables
```bash
cp backend/.env.example backend/.env
```

4. Run database migrations
```bash
cd backend
npx prisma migrate dev
cd ..
```

### Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

Or run them separately:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## API Documentation

API endpoints are documented at `/api/docs` when running the backend.

## License

MIT
