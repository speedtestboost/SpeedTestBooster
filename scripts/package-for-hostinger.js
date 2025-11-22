import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
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

// Copy essential files
const filesToCopy = [
  'dist/',
  'package.json',
  'package-lock.json'
];

const filesCopyOptional = [
  '.env.production',
  'client/public/robots.txt',
  'client/public/sitemap.xml',
  'client/public/ads.txt'
];

// Copy required files
filesToCopy.forEach(file => {
  const srcPath = path.join(__dirname, '..', file);
  const destPath = path.join(deployDir, file);
  
  if (fs.existsSync(srcPath)) {
    if (fs.statSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
    console.log(`✅ Copied ${file}`);
  } else {
    console.log(`⚠️  ${file} not found, skipping...`);
  }
});

// Copy optional files
filesCopyOptional.forEach(file => {
  const srcPath = path.join(__dirname, '..', file);
  const destPath = path.join(deployDir, path.basename(file));
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied ${file}`);
  }
});

// Create production environment template
const envProduction = `NODE_ENV=production
PORT=3000

# Database Configuration
# Keep using your Neon database (recommended)
DATABASE_URL=your_neon_database_url_here

# Session Configuration
SESSION_SECRET=your-super-secure-session-secret-change-this

# Google Analytics (if you have it)
VITE_GA_MEASUREMENT_ID=your-ga-measurement-id

# Optional: Add other environment variables as needed
`;

fs.writeFileSync(path.join(deployDir, '.env.example'), envProduction);

// Create Hostinger-specific server entry point
const serverEntry = `const express = require('express');
const path = require('path');
require('dotenv').config();

// Create Express app
const app = express();

// Import your server logic
// Note: This assumes your built server file exports the app
try {
  const serverApp = require('./dist/index.js');
  // If your server exports default, use: serverApp.default
} catch (error) {
  console.log('Server app not found, creating basic server...');
}

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from client build
app.use(express.static(path.join(__dirname, 'dist/public')));

// API routes (if you have them)
// Add your API routes here or import from your server

// Handle client-side routing - serve index.html for all non-API routes
app.get('*', (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(\`🚀 SpeedTestBooster running on port \${PORT}\`);
  console.log(\`🌍 Environment: \${process.env.NODE_ENV || 'development'}\`);
  console.log(\`🔗 Local: http://localhost:\${PORT}\`);
});

export default app;
`;

fs.writeFileSync(path.join(deployDir, 'server.js'), serverEntry);

// Create .htaccess for Apache (Hostinger uses Apache)
const htaccess = `RewriteEngine On

# Handle Node.js app
RewriteCond %{REQUEST_URI} ^/api
RewriteRule ^(.*)$ /server.js [L,QSA]

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /dist/public/index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
`;

fs.writeFileSync(path.join(deployDir, '.htaccess'), htaccess);

// Create README for Hostinger deployment
const readme = `# SpeedTestBooster - Hostinger Deployment

## Installation Instructions

1. **Upload files**: Upload all files from this package to your Hostinger public_html directory

2. **Install dependencies**:
   \`\`\`bash
   cd public_html
   npm install --production
   \`\`\`

3. **Configure environment**:
   \`\`\`bash
   cp .env.example .env
   nano .env  # Edit with your actual values
   \`\`\`

4. **Start the application**:
   \`\`\`bash
   npm run start:hostinger
   \`\`\`

## Environment Variables Required

- \`DATABASE_URL\`: Your Neon database connection string
- \`SESSION_SECRET\`: A secure random string for sessions
- \`VITE_GA_MEASUREMENT_ID\`: Google Analytics ID (optional)

## Hostinger Control Panel Setup

1. Enable Node.js in your hosting control panel
2. Set Node.js version to 18 or higher
3. Point your domain to the hosting account
4. Enable SSL certificate

## Domain Configuration

Make sure your domain \`speedtestboost.com\` points to your Hostinger hosting:
- Update nameservers to Hostinger's nameservers, or
- Update A record to point to your Hostinger server IP

## Troubleshooting

- Check Node.js is enabled in Hostinger panel
- Verify file permissions (755 for directories, 644 for files)
- Check error logs in Hostinger control panel
- Ensure all environment variables are set correctly

## Support

If you need help, check:
- Hostinger documentation
- Node.js app setup guides
- Contact Hostinger support if needed
`;

fs.writeFileSync(path.join(deployDir, 'README-HOSTINGER.md'), readme);

// Create package.json for production
const prodPackageJson = {
  "name": "speedtestbooster-production",
  "version": "1.0.0",
  "type": "commonjs",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "start:hostinger": "NODE_ENV=production node server.js"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  },
  "dependencies": {
    "express": "^4.21.2",
    "dotenv": "^16.3.1"
  }
};

fs.writeFileSync(
  path.join(deployDir, 'package.json'), 
  JSON.stringify(prodPackageJson, null, 2)
);

// Create deployment checklist
const checklist = `# Hostinger Deployment Checklist

## Pre-deployment
- [ ] Build completed successfully
- [ ] All files copied to deployment package
- [ ] Environment variables configured
- [ ] Database connection tested

## Upload to Hostinger
- [ ] Files uploaded to public_html
- [ ] Dependencies installed (\`npm install\`)
- [ ] Environment file configured
- [ ] File permissions set correctly

## Configuration
- [ ] Node.js enabled in Hostinger panel
- [ ] Domain pointing to hosting account
- [ ] SSL certificate activated
- [ ] Error logs checked

## Testing
- [ ] Website loads at speedtestboost.com
- [ ] All pages work correctly
- [ ] API endpoints responding
- [ ] Database connections working
- [ ] Mobile responsiveness checked

## Post-deployment
- [ ] DNS propagation complete
- [ ] Search console updated
- [ ] Analytics tracking working
- [ ] Performance monitoring setup
`;

fs.writeFileSync(path.join(deployDir, 'DEPLOYMENT-CHECKLIST.md'), checklist);

console.log('🎉 Deployment package created successfully!');
console.log('📁 Location: hostinger-deploy/');
console.log('');
console.log('📋 Next steps:');
console.log('1. Review the files in hostinger-deploy/');
console.log('2. Configure .env with your actual values');
console.log('3. Create a ZIP file of the hostinger-deploy folder');
console.log('4. Upload to your Hostinger public_html directory');
console.log('5. Follow the instructions in README-HOSTINGER.md');
console.log('');
console.log('🌍 Your SpeedTestBooster app will be live at speedtestboost.com!');
