# Lead Management System (Mini CRM)

A full-stack Lead Management System for a real estate use case, built with **Node.js/Express**, **MongoDB**, and **React (Vite)**.

## Features

- **Lead Capture**: Add leads with name, phone, email, budget, location, property type, and source.
- **Lead Listing**: Searchable, filterable, sortable table of all leads.
- **Lead Detail View**: View full lead info, add notes/comments, update status (New → Contacted → Site Visit → Closed).
- **Dashboard**: Total leads, leads by source, conversion rate, and status distribution.
- **Validation & Error Handling**: Client-side and server-side validation with centralized error handling.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: React, Vite, React Router, Axios
- **Database**: MongoDB

## Project Structure

```
backend/     Express REST API
frontend/    React (Vite) client
```

## Quick Start (Recommended)

If you just want to get the app running with one command:

```bash
./start.sh
```

This script will install dependencies for both backend and frontend, create `.env` files if missing, and start both servers:

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

Press `Ctrl+C` to stop both servers. Logs are written to `backend.log` and `frontend.log` in the project root.

> **Prerequisite:** MongoDB must be running locally (or update `backend/.env` with a MongoDB Atlas connection string) before running the script.

## Manual Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB running locally (or a MongoDB Atlas connection string)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # update MONGO_URI if needed
npm run dev
```

The API runs on `http://localhost:5000` by default. Health check: `GET /api/health`.

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # points to the backend API
npm run dev
```

The app runs on `http://localhost:5173` and proxies `/api` requests to the backend.

## API Endpoints

| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| GET    | /api/leads             | List leads (search/filter/sort) |
| GET    | /api/leads/:id         | Get single lead                 |
| POST   | /api/leads             | Create a lead                   |
| PUT    | /api/leads/:id         | Update a lead                   |
| PATCH  | /api/leads/:id/status  | Update lead status              |
| POST   | /api/leads/:id/notes   | Add a note to a lead            |
| DELETE | /api/leads/:id         | Delete a lead                   |
| GET    | /api/dashboard/metrics | Get dashboard metrics           |

## Query Params for GET /api/leads

- `search` — matches name or phone
- `source` — filter by lead source
- `status` — filter by status
- `sortBy` — `createdAt` or `budget`
- `order` — `asc` or `desc`
