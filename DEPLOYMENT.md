# SpeedTestBooster - Complete Deployment Guide

## ✅ Status: Your app is now running locally at http://localhost:5000

## Local Development Setup (COMPLETED)

1. ✅ Dependencies installed
2. ✅ Environment configured  
3. ✅ Server running on localhost:5000
4. ✅ Database configuration ready

---

## Production Deployment to speedtestboost.com

### Option 1: VPS Deployment (Recommended)

#### Prerequisites
- Ubuntu/Debian VPS (DigitalOcean, Linode, Vultr, etc.)
- Domain pointing to your server IP
- SSH access to your server

#### Step 1: Server Setup
```bash
# Connect to your server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

#### Step 2: Deploy Your App
```bash
# Clone your repository
git clone https://github.com/yourusername/SpeedTestBooster.git
cd SpeedTestBooster

# Copy production environment
cp .env.production .env
# Edit .env with your actual values
nano .env

# Install dependencies and build
npm ci --only=production
npm run build

# Start with PM2
pm2 start dist/index.js --name speedtestboost
pm2 startup
pm2 save
```

#### Step 3: Configure Nginx
```bash
# Copy nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/speedtestboost.com
sudo ln -s /etc/nginx/sites-available/speedtestboost.com /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### Step 4: Get SSL Certificate
```bash
# Get Let's Encrypt certificate
sudo certbot --nginx -d speedtestboost.com -d www.speedtestboost.com

# Test auto-renewal
sudo certbot renew --dry-run
```

#### Step 5: DNS Configuration
In your domain registrar (GoDaddy, Namecheap, etc.):
- Add A record: `speedtestboost.com` → `your-server-ip`
- Add A record: `www.speedtestboost.com` → `your-server-ip`

### Option 2: Docker Deployment
```bash
# On your server
git clone https://github.com/yourusername/SpeedTestBooster.git
cd SpeedTestBooster

# Copy and edit environment
cp .env.production .env
nano .env

# Build and run with Docker
docker-compose up -d app
```

### Option 3: Managed Hosting (Easier)

#### Render.com
1. Connect your GitHub repository
2. Choose "Web Service"
3. Build command: `npm run build`
4. Start command: `npm start`
5. Add environment variables in dashboard
6. Point your domain to Render

#### Vercel (Frontend) + Railway (Backend)
1. Deploy frontend to Vercel
2. Deploy backend to Railway
3. Update API endpoints
4. Configure custom domain

---

## Environment Variables You Need

### Required
- `VITE_GA_MEASUREMENT_ID`: Your Google Analytics ID
- `DATABASE_URL`: Your Neon database connection string

### Optional
- `SESSION_SECRET`: For session management
- `PORT`: Server port (default: 5000)

---

## Monitoring & Maintenance

### View Logs
```bash
# PM2 logs
pm2 logs speedtestboost

# Docker logs
docker-compose logs -f app

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Updates
```bash
# Use the deployment script
./deploy.sh

# Or manually
git pull
npm ci --only=production
npm run build
pm2 restart speedtestboost
```

### Backup
```bash
# Database backup (if using PostgreSQL locally)
pg_dump $DATABASE_URL > backup.sql

# For Neon, use their dashboard or CLI tools
```

---

## Troubleshooting

### App won't start
- Check logs: `pm2 logs speedtestboost`
- Verify environment variables: `printenv | grep -E "(NODE_ENV|PORT|DATABASE_URL)"`
- Test manually: `npm start`

### Database connection issues
- Verify DATABASE_URL in .env
- Check Neon database status
- Test connection: `psql $DATABASE_URL`

### Domain not working
- Check DNS propagation: `dig speedtestboost.com`
- Verify Nginx configuration: `sudo nginx -t`
- Check SSL certificate: `sudo certbot certificates`

---

## Performance Optimization

### Enable Gzip (already in nginx.conf)
### Use CDN (Cloudflare recommended)
### Database indexing
### Monitoring (consider Uptime Robot)

---

## Security Checklist

- ✅ HTTPS enabled
- ✅ Security headers configured  
- ✅ Environment variables secured
- ✅ Regular backups
- ✅ Server updates

---

## Next Steps

1. **Get a VPS** (DigitalOcean, Linode, Vultr)
2. **Set up your database** (Neon PostgreSQL)
3. **Configure your domain** DNS records
4. **Follow the deployment steps** above
5. **Test your live site**

Your app is production-ready! 🚀
