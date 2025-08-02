# Speed Test and Boost Application

## Overview
This full-stack application provides internet speed testing, historical test tracking, network information display, and WiFi optimization features. Built with React and Express, it aims to offer a comprehensive solution for users to monitor and improve their internet connection. The business vision is to become a leading platform for network diagnostics, leveraging a modern tech stack and focusing on user experience and accurate measurements.

**Latest Addition (Feb 2025)**: Created high-traffic "Internet Speed Requirements Guide 2025" page targeting 100,000+ monthly searches globally with interactive speed calculator and comprehensive SEO optimization.

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
- **Design Decisions**: Modern dark theme, animated header with custom speed gauge icon, responsive design (desktop three-column layout, mobile-first), improved contrast and readability.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (using Neon Database)
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error handling middleware
- **Logging**: Custom request logging
- **Core Features**:
    - **Real Speed Test Implementation**: Replaced simulation with real network measurements. Utilizes custom server-side endpoints (`/api/speed-test/download/:size`, `/api/speed-test/upload`) to stream random data and receive uploads, eliminating CORS. Follows fast.com methodology with concurrent connections and global bandwidth tracking. Calculates peak sustained bandwidth (top 20%). Measures ping using reliable endpoints and jitter from 8 ping samples.
    - **Session Isolation**: Implements session-based isolation using `localStorage` to provide unique speed test history per device/browser.
    - **WiFi Optimization**: Features an interactive `OptimizationModal` simulating network optimization steps (scanning channels, optimizing bandwidth, clearing cache, configuring QoS).

### Database Schema
- `users`: User authentication (`id`, `username`, `password`)
- `speed_tests`: Speed test results (`id`, `download_speed`, `upload_speed`, `ping`, `jitter`, `server_location`, `connection_type`, `timestamp`, `sessionId`)

### System Design Choices
- Clean separation of concerns between frontend (UI, interactions) and backend (data persistence, business logic).
- Abstracted storage layer.
- Comprehensive SEO optimization including meta tags, structured data (Schema.org), sitemaps, robots.txt, and internal linking for improved search rankings.
- Creation of SEO-friendly city-specific and country-specific landing pages with localized content and internationalization strategy.
- Focus on low-competition, long-tail keyword targeting.
- **High-Traffic Content Strategy**: Created "Internet Speed Requirements Guide 2025" page targeting 100,000+ monthly searches globally with interactive speed calculator, comprehensive activity-based recommendations, and FAQ section optimized for featured snippets.

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React
- **State Management**: TanStack Query
- **Validation**: Zod
- **Icons**: Lucide React
- **Date Handling**: date-fns

### Backend Dependencies
- **Database**: Drizzle ORM
- **Validation**: Zod
- **Session Management**: Connect-pg-simple
- **IP Geolocation**: Used for real-time ISP and location detection.
- **External Speed Test Endpoints**: For ping measurements (e.g., Google, Cloudflare).