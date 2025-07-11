# Speed Test Application

## Overview

This is a full-stack speed test application built with a React frontend and Express backend. The application allows users to test their internet connection speed, view test history, and get network information. It uses a modern tech stack with TypeScript, shadcn/ui components, and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error handling middleware
- **Logging**: Custom request logging with response time tracking

## Key Components

### Frontend Components
- **SpeedGauge**: Circular progress indicator showing current speed test results
- **TestHistory**: List of previous speed tests with timestamps
- **NetworkInfo**: Display of network connection details
- **OptimizationModal**: Modal for network optimization simulation

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Speed Test API**: Endpoints for creating, reading, and deleting speed tests
- **Network Info API**: Endpoint for retrieving client network information

### Database Schema
- **users**: User authentication (id, username, password)
- **speed_tests**: Speed test results (id, download_speed, upload_speed, ping, jitter, server_location, connection_type, timestamp)

## Data Flow

1. **Speed Test Execution**: Client-side speed test simulation using fetch requests to measure network performance
2. **Result Storage**: Test results are posted to `/api/speed-tests` endpoint
3. **History Display**: Test history is fetched from `/api/speed-tests` with optional limit parameter
4. **Network Information**: Client IP and user agent information retrieved from `/api/network-info`

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with shadcn/ui components
- **State Management**: TanStack Query for caching and synchronization
- **Validation**: Zod for schema validation
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for request validation
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

## Deployment Strategy

### Development Mode
- Vite dev server for hot module replacement
- Express server with TypeScript compilation via tsx
- Integrated logging and error overlay

### Production Build
- Vite builds optimized frontend bundle to `dist/public`
- esbuild compiles backend TypeScript to `dist/index.js`
- Single deployment artifact with static file serving

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Automatic database provisioning check on startup
- Drizzle migrations stored in `./migrations` directory

### Database Migration
- Drizzle Kit for schema management
- Push-based deployment with `npm run db:push`
- PostgreSQL dialect with automatic SSL handling

The application follows a clean separation of concerns with the frontend handling UI state and user interactions, while the backend manages data persistence and business logic. The storage layer is abstracted to allow for different implementations (currently in-memory for development, easily extensible to PostgreSQL for production).