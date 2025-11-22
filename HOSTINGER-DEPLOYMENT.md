# SpeedTestBooster - Hostinger Deployment Guide

## 🎯 Overview

This guide will help you deploy your SpeedTestBooster application to Hostinger Business hosting with your custom domain `speedtestboost.com`.

## 🛠️ Prerequisites

- [x] Hostinger Business hosting account purchased
- [x] Domain `speedtestboost.com` connected to Hostinger
- [x] Node.js enabled in Hostinger control panel
- [x] Neon database (or Hostinger database) ready

## 📦 Deployment Process

### Step 1: Prepare Deployment Package

Run the automated deployment script:

```bash
./deploy-hostinger.sh
```

This will:
- Clean previous builds
- Install dependencies
- Build your application
- Create a deployment package
- Generate a ZIP file for upload

### Step 2: Upload to Hostinger

1. **Access File Manager**
   - Log into your Hostinger control panel
   - Navigate to File Manager
   - Go to `public_html` directory

2. **Upload Files**
   - Upload the generated ZIP file (`speedtestbooster-hostinger-XXXXXX.zip`)
   - Extract the ZIP file in `public_html`
   - Delete the ZIP file after extraction

### Step 3: Configure Environment

1. **Create Environment File**
   ```bash
   cp .env.example .env
   ```

2. **Edit Environment Variables**
   ```bash
   nano .env
   ```
   
   Update these critical values:
   ```env
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=your_actual_neon_database_url
   SESSION_SECRET=your_secure_random_string_32_chars_minimum
   VITE_GA_MEASUREMENT_ID=your_actual_ga_measurement_id
   ```

### Step 4: Install Dependencies

In Hostinger's terminal or SSH:

```bash
cd public_html
npm install --production
```

### Step 5: Configure Hostinger Control Panel

1. **Enable Node.js**
   - Go to Advanced → Node.js
   - Enable Node.js (version 18 or higher)
   - Set entry point to: `server.js`
   - Set Node.js version: `18` or `20`

2. **Configure Domain**
   - Ensure `speedtestboost.com` points to your hosting account
   - Enable SSL certificate (usually automatic)

3. **Set Environment Variables** (if available in panel)
   - Add your environment variables in the Node.js settings

### Step 6: Start the Application

```bash
npm run start:hostinger
```

Or use PM2 for process management:

```bash
npm install -g pm2
pm2 start server.js --name speedtestbooster
pm2 startup
pm2 save
```

## 🔧 File Structure on Hostinger

After deployment, your `public_html` should look like:

```
public_html/
├── dist/
│   ├── public/           # Client-side build
│   └── server/           # Server-side build
├── server.js             # Main server entry
├── package.json          # Production dependencies
├── .env                  # Environment variables
├── .htaccess             # Apache configuration
└── README-HOSTINGER.md   # Deployment instructions
```

## 🌐 DNS Configuration

### If using Hostinger nameservers:
Your domain should automatically point to the hosting account.

### If using external DNS:
Update your DNS records:
```
A Record: speedtestboost.com → [Hostinger Server IP]
CNAME: www → speedtestboost.com
```

## 🔍 Verification & Testing

1. **Test the Website**
   - Visit `https://speedtestboost.com`
   - Test all major features
   - Check mobile responsiveness
   - Verify speed test functionality

2. **Check Logs**
   - Monitor error logs in Hostinger control panel
   - Check application logs: `pm2 logs speedtestbooster`

3. **Performance Tests**
   - Test page load speeds
   - Verify database connections
   - Check API endpoints

## 🚨 Troubleshooting

### Common Issues:

**1. "Cannot find module" errors**
```bash
npm install --production
npm rebuild
```

**2. Port conflicts**
- Ensure PORT=3000 in .env
- Check Hostinger's Node.js port requirements

**3. Database connection issues**
```bash
# Test database connection
node -e "console.log(process.env.DATABASE_URL)"
```

**4. File permissions**
```bash
chmod 755 public_html
chmod 644 public_html/*.js
chmod 600 .env
```

**5. SSL certificate issues**
- Check SSL status in Hostinger control panel
- Force HTTPS redirect may be needed

### Performance Issues:

**1. Slow loading**
- Enable gzip compression (in .htaccess)
- Check CDN settings
- Optimize images and assets

**2. Memory usage**
```bash
# Monitor with PM2
pm2 monit
```

## 🔄 Updates & Maintenance

### To deploy updates:

1. **Local development**
   ```bash
   # Make your changes
   git add .
   git commit -m "Your changes"
   git push
   ```

2. **Rebuild and deploy**
   ```bash
   ./deploy-hostinger.sh
   ```

3. **Upload and restart**
   ```bash
   # On Hostinger
   pm2 restart speedtestbooster
   ```

### Regular maintenance:

- **Monitor logs** regularly
- **Update dependencies** monthly
- **Backup database** weekly
- **Check performance** metrics
- **Monitor SSL certificate** expiry

## 📊 Monitoring

### Set up monitoring for:

- **Uptime monitoring** (UptimeRobot, Pingdom)
- **Performance monitoring** (Google PageSpeed Insights)
- **Error tracking** (Sentry, LogRocket)
- **Analytics** (Google Analytics)

## 🎯 Success Checklist

- [ ] Application deployed successfully
- [ ] Domain `speedtestboost.com` working
- [ ] SSL certificate active
- [ ] All pages loading correctly
- [ ] Speed test functionality working
- [ ] Database connections stable
- [ ] Analytics tracking active
- [ ] Error monitoring setup
- [ ] Backup system in place
- [ ] Performance optimized

## 📞 Support

### Hostinger Support:
- Live chat available 24/7
- Knowledge base: hostinger.com/tutorials
- Community forum

### Application Support:
- Check deployment logs
- Review environment configuration
- Verify database connections
- Test API endpoints

---

**🎉 Congratulations!** Your SpeedTestBooster application should now be live at `https://speedtestboost.com`!
