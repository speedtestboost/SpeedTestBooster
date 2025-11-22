# SpeedTestBooster - Local Development Setup

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Local Development Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and add your actual values:
- `VITE_GA_MEASUREMENT_ID`: Your Google Analytics Measurement ID
- `DATABASE_URL`: Your Neon database connection string

3. **Run the development server:**
```bash
npm run dev
```

The app will be available at: http://localhost:5000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## Project Structure

- `client/` - React frontend
- `server/` - Express backend
- `shared/` - Shared types and schemas
- `attached_assets/` - Static assets

## Database Setup

This project uses Neon PostgreSQL. You'll need to:

1. Create a Neon database account
2. Get your connection string
3. Add it to your `.env` file as `DATABASE_URL`

If you don't have a database yet, you can temporarily comment out the DATABASE_URL in `.env` to test the frontend functionality.

## Deployment

The app was originally built for Replit but can be deployed anywhere that supports Node.js.

For production deployment to your domain (speedtestboost.com), you'll need:
- A VPS or hosting service
- DNS configuration
- SSL certificate (Let's Encrypt)
