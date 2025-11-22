import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📦 Creating Hostinger deployment package...');

// Create deployment directory
const deployDir = path.join(__dirname, '../hostinger-deploy');
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
fs.mkdirSync(deployDir, { recursive: true });

// Copy built client files
const distPublicPath = path.join(__dirname, '../dist/public');
if (fs.existsSync(distPublicPath)) {
  fs.cpSync(distPublicPath, path.join(deployDir, 'public'), { recursive: true });
  console.log('✅ Copied client build files');
} else {
  console.log('⚠️  Client build not found. Run npm run build first.');
}

// Create simplified server for Hostinger
const serverCode = `const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic logging
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Basic API endpoints (add your actual API routes here)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV 
  });
});

// Handle client-side routing
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(\`🚀 SpeedTestBooster running on port \${PORT}\`);
  console.log(\`🌍 Environment: \${process.env.NODE_ENV || 'development'}\`);
  console.log(\`🔗 Visit: http://localhost:\${PORT}\`);
});

module.exports = app;
`;

fs.writeFileSync(path.join(deployDir, 'app.js'), serverCode);

// Create package.json for production
const prodPackage = {
  "name": "speedtestbooster-hostinger",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "express": "^4.21.2",
    "dotenv": "^16.3.1"
  }
};

fs.writeFileSync(path.join(deployDir, 'package.json'), JSON.stringify(prodPackage, null, 2));

// Create environment template
const envTemplate = \`NODE_ENV=production
PORT=3000

# Database Configuration
DATABASE_URL=your_neon_database_url_here

# Session Secret
SESSION_SECRET=your-secure-session-secret-here

# Google Analytics
VITE_GA_MEASUREMENT_ID=your-ga-measurement-id

# Security
CORS_ORIGIN=https://speedtestboost.com
\`;

fs.writeFileSync(path.join(deployDir, '.env.example'), envTemplate);

// Create .htaccess
const htaccess = \`RewriteEngine On

# Handle Node.js app
RewriteCond %{REQUEST_URI} ^/api
RewriteRule ^(.*)$ app.js [L,QSA]

# Handle client-side routing for SPA
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ public/index.html [L,QSA]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/css application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/* "access plus 1 year"
</IfModule>
\`;

fs.writeFileSync(path.join(deployDir, '.htaccess'), htaccess);

// Create README
const readme = \`# SpeedTestBooster - Hostinger Deployment

## Quick Setup

1. Upload all files to your Hostinger public_html directory
2. Install dependencies: \\\`npm install\\\`
3. Copy environment: \\\`cp .env.example .env\\\`
4. Edit .env with your actual values
5. Enable Node.js in Hostinger control panel
6. Start the app: \\\`npm start\\\`

## File Structure
- public/ - Static client files
- app.js - Main server file
- package.json - Dependencies
- .env.example - Environment template
- .htaccess - Apache configuration

## Important
- Set Node.js version to 18+ in Hostinger panel
- Configure your environment variables
- Enable SSL certificate
- Test all functionality after deployment

Your site will be live at: https://speedtestboost.com
\`;

fs.writeFileSync(path.join(deployDir, 'README.md'), readme);

console.log('🎉 Hostinger deployment package created!');
console.log('📁 Location: hostinger-deploy/');
console.log('📋 Files created:');
console.log('  - public/ (client build)');
console.log('  - app.js (server)');
console.log('  - package.json');
console.log('  - .env.example');
console.log('  - .htaccess');
console.log('  - README.md');
console.log('');
console.log('🚀 Next: Create ZIP and upload to Hostinger!');
