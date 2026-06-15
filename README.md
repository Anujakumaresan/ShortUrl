# Linkly - Premium URL Shortener

This project is a full-stack URL shortening service built with React, Node.js, Express, and PostgreSQL. It features custom aliases, expiration dates, link analytics (clicks by browser, device, location), QR code generation, bulk upload, and a complete user authentication system.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database

### 1. Database Setup
Ensure PostgreSQL is running and create a database named `shorturl_db` (or your preferred name). You will need to run the initial schema creation script (which should include tables for `users`, `urls`, and `analytics`).

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=shorturl_db
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Assumptions Made
- Users must be authenticated to create, manage, and view analytics for short URLs.
- The PostgreSQL database is running locally on the default port (5432) unless configured otherwise.
- The application relies on `geoip-lite` for IP tracking and location data, and naive header parsing for device and browser analytics.

## Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Recharts (for Analytics)
- Tailwind CSS / Material UI

**Backend:**
- Node.js & Express
- PostgreSQL
- JSON Web Tokens (JWT) for Authentication
- `geoip-lite` for IP tracking

## Project Structure

```text
shorturl/
├── backend/
│   ├── src/
│   │   ├── config/       # Database & Environment configuration
│   │   ├── controllers/  # Route handlers logic
│   │   ├── middleware/   # Auth & Error middlewares
│   │   ├── models/       # Database schemas/queries
│   │   ├── routes/       # API endpoints definitions
│   │   ├── services/     # Core business logic (e.g., URL generation)
│   │   └── app.js        # Express app entry point
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Dashboard, Analytics, Auth views
    │   ├── services/     # Axios API calls
    │   ├── utils/        # Helper functions
    │   ├── App.jsx       # Main React component
    │   └── main.jsx      # React DOM rendering
    ├── package.json
    └── vite.config.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

### URLs
- `POST /api/urls/shorten` - Create a new short URL
- `GET /api/urls` - Retrieve all URLs for the logged-in user
- `DELETE /api/urls/:id` - Delete a specific URL

### Redirection
- `GET /s/:alias` - Redirects to original URL and records click analytics

### Analytics
- `GET /api/analytics/:alias` - Get analytics data for a specific short URL

## Sample Analytics Data

When users click the generated short links, the system captures the following analytics:
- **Total Clicks:** 1,245
- **Unique Visitors:** 890
- **Locations:** US (45%), IN (30%), UK (15%), Other (10%)
- **Devices:** Desktop (60%), Mobile (35%), Tablet (5%)
- **Browsers:** Chrome (70%), Safari (20%), Firefox (10%)

## AI Planning Document and Architecture Diagram

### Architecture
- **Frontend:** React (Vite) Single Page Application utilizing `react-router-dom` for navigation, `recharts` for analytics visualization, and `qrcode.react` for QR codes.
- **Backend:** Node.js API with Express. Handling RESTful routes, JWT authentication, and redirection logic.
- **Database:** PostgreSQL. Relational database storing user data, URL mappings, and detailed click analytics.

```mermaid
graph TD
    Client[Client Browser] -->|HTTP/REST| Frontend[React Frontend (Port 3000)]
    Frontend -->|API Requests| Backend[Node.js / Express Backend (Port 5000)]
    Client -->|Short URL redirect /s/:id| Backend
    Backend -->|Read/Write| DB[(PostgreSQL)]
```

### AI Planning Document

The development of this application followed a structured AI-assisted planning phase:

**Phase 1: Foundation & Data Modeling**
- Designed a robust PostgreSQL database schema including `users`, `urls`, and `analytics` tables.
- Set up the Node.js/Express backend environment and established database connectivity.

**Phase 2: Core URL Shortening Logic**
- Implemented API endpoints for generating short codes (using standard randomized strings and custom user aliases).
- Built the redirection controller to handle routing from the short URL to the original destination, tracking the click event in the process.

**Phase 3: Analytics & Frontend Integration**
- Integrated tracking for IP addresses (using geo-location mapping), browsers, and devices.
- Developed the React (Vite) frontend with a focus on a responsive Dashboard to display `recharts` graphs for analytics.

**Phase 4: Security & Polish**
- Secured endpoints with JWT authentication.
- Added supplementary features such as QR code generation (`qrcode.react`) and link expiration limits.

## Project Output

The application successfully delivers a premium URL shortening experience. Key outputs include:

- **Interactive Dashboard:** A centralized, authenticated view for users to manage their links.
- **Detailed Analytics:** Visual charts breaking down link clicks by location, device type, and referring browser.
- **QR Code Support:** Immediate, downloadable QR codes generated for every active short link.
- **Robust API:** A well-documented backend API ready for further integration.


## Video Demonstration

**Video Link:** [https://youtu.be/59PFCq4fPS0]

---

This project is a part of a hackathon run by https://katomaran.com
