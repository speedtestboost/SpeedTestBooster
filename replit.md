# Speed Test and Boost Application

## Overview
This full-stack application provides internet speed testing, historical test tracking, network information display, and WiFi optimization features. Built with React and Express, it aims to offer a comprehensive solution for users to monitor and improve their internet connection. The business vision is to become a leading platform for network diagnostics, leveraging a modern tech stack and focusing on user experience and accurate measurements. The project has a strong focus on internationalization and SEO, targeting high-volume, lower-competition keywords across multiple languages and geographies.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **UI Components**: shadcn/ui built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables (dark theme with purple/pink gradient accents)
- **Forms**: React Hook Form with Zod validation
- **Design Decisions**: Modern dark theme, static logo (progress gauge design) with responsive branding, responsive design (desktop three-column layout, mobile-first), improved contrast and readability.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (using Neon Database)
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error handling middleware
- **Logging**: Custom request logging
- **Core Features**:
    - **Real Speed Test Implementation**: Utilizes custom server-side endpoints to stream random data and receive uploads, eliminating CORS. Follows fast.com methodology with concurrent connections and global bandwidth tracking. Calculates peak sustained bandwidth (top 20%). Measures ping using reliable endpoints and jitter from 8 ping samples.
    - **Session Isolation**: Implements session-based isolation using `localStorage` for unique speed test history per device/browser.
    - **WiFi Optimization**: Features an interactive `OptimizationModal` simulating network optimization steps.

### Database Schema
- `users`: User authentication (`id`, `username`, `password`)
- `speed_tests`: Speed test results (`id`, `download_speed`, `upload_speed`, `ping`, `jitter`, `server_location`, `connection_type`, `timestamp`, `sessionId`)

### System Design Choices
- Clean separation of concerns between frontend and backend.
- Abstracted storage layer.
- Comprehensive SEO optimization including meta tags, structured data (Schema.org), sitemaps, robots.txt, hreflang, and internal linking.
- Creation of SEO-friendly city-specific and country-specific landing pages with localized content and internationalization strategy (English, Spanish, Indonesian, Portuguese-Brazil, French).
- Focus on low-competition, long-tail keyword targeting for high-traffic content (e.g., "Internet Speed Requirements Guide 2025").

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React
- **State Management**: TanStack Query
- **Validation**: Zod
- **Icons**: Lucide React
- **Date Handling**: date-fns

### Backend Dependencies
- **Database**: Drizzle ORM (PostgreSQL via Neon)
- **Validation**: Zod
- **Session Management**: Connect-pg-simple
- **IP Geolocation**: For real-time ISP and location detection.
- **External Speed Test Endpoints**: For ping measurements (e.g., Google, Cloudflare).
- **Google Analytics (GA4)**: For comprehensive tracking of user behavior and performance metrics.
- **IndexNow API**: For real-time indexing notifications to Bing/Yandex.