# Speed Test and Boost Application

## Overview

This is a full-stack speed test application built with a React frontend and Express backend. The "Speed Test and Boost" application allows users to test their internet connection speed, view test history, get network information, and optimize their WiFi connection. It uses a modern tech stack with TypeScript, shadcn/ui components, and Drizzle ORM for database operations.

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

## Recent Changes (January 2025)

### Speed Test Accuracy Improvements
- Enhanced ping measurement with multiple servers and outlier removal
- Implemented multi-size download tests (1MB, 5MB, 10MB) with accurate progress tracking
- Added multi-size upload tests (0.5MB, 1MB, 2MB) with random data generation
- Improved error handling with realistic fallback values
- Better caching prevention with comprehensive HTTP headers
- Fixed speed test calibration to provide realistic results matching actual internet speeds
- Added performance-based speed calculations with network condition factors

### Network Information Enhancements
- Implemented IPv4-only address filtering (no more multiple IP addresses displayed)
- Added real-time ISP and location detection using IP geolocation API
- Enhanced network info endpoint with proper IP address extraction
- Improved connection type and server location accuracy

### UI/UX Enhancements
- Redesigned with modern dark theme and gradient accents
- Added purple/pink gradient color scheme for premium feel
- Implemented hover effects and smooth transitions
- Enhanced gauge visualization with SVG gradients and glow effects
- Improved button styling with active states and animations
- Added card hover effects with subtle borders and shadows
- Better contrast and readability with proper color variables

### Responsive Design Implementation
- Created desktop-optimized three-column layout inspired by professional speed test applications
- Expanded desktop layout with larger speed gauge and better component organization
- Maintained mobile-first responsive design (mobile layout unchanged)
- Added larger text sizes and improved spacing for desktop viewing
- Implemented proper responsive breakpoints for seamless mobile-to-desktop experience

### SEO Optimization Implementation
- Comprehensive meta tags targeting high-volume, low-competition keywords
- Strategic keyword targeting: "internet speed test", "wifi speed test", "bandwidth test"
- Complete Open Graph and Twitter Card implementation for social sharing
- Schema.org structured data for WebApplication and SoftwareApplication
- SEO-optimized title and description tags for better search rankings
- Canonical URLs, proper robots directives, and search engine indexing optimization
- Performance-focused preconnect links and optimized meta structure

### Technical Improvements
- More accurate speed calculations with multiple test iterations
- Enhanced progress tracking during speed tests
- Better error handling and fallback mechanisms
- Improved visual feedback with loading states and animations
- Desktop layout uses CSS Grid for optimal component arrangement