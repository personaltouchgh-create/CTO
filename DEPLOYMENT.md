# Deployment Guide for DutiCalls Marketing Website

This guide covers various deployment options for the DutiCalls marketing website.

## Prerequisites

- GitHub repository (for most deployment options)
- Domain name (optional but recommended)
- CMS setup (Strapi or Contentful)

## Option 1: Vercel (Recommended - Easiest)

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel dashboard
   - Select your project
   - Settings → Environment Variables
   - Add:
     - `NODE_ENV=production`
     - `CMS_API_URL=<your-cms-url>`
     - `CMS_API_TOKEN=<your-token>`

4. **Deploy**
   ```bash
   vercel --prod
   ```

Your site will be live at: `https://your-project.vercel.app`

### Custom Domain:
1. Vercel Dashboard → Domains
2. Add your domain
3. Update DNS records as instructed

---

## Option 2: Heroku

### Steps:

1. **Create Heroku Account**
   - Sign up at heroku.com

2. **Install Heroku CLI**
   ```bash
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

3. **Login and Create App**
   ```bash
   heroku login
   heroku create duticalls-marketing
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set CMS_API_URL=<your-cms-url>
   heroku config:set CMS_API_TOKEN=<your-token>
   ```

5. **Create Procfile**
   Create `Procfile` in root:
   ```
   web: node backend/server.js
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

7. **Open App**
   ```bash
   heroku open
   ```

### Custom Domain:
```bash
heroku domains:add www.duticalls.com
```
Update DNS records as instructed.

---

## Option 3: DigitalOcean App Platform

### Steps:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Create App**
   - Go to DigitalOcean App Platform
   - Click "Create App"
   - Connect GitHub repository

3. **Configure Build Settings**
   - Build Command: `npm install`
   - Run Command: `npm start`
   - Port: 3000

4. **Add Environment Variables**
   - `NODE_ENV=production`
   - `CMS_API_URL=<your-cms-url>`
   - `CMS_API_TOKEN=<your-token>`

5. **Deploy**
   - Click "Create Resources"
   - Wait for deployment

### Custom Domain:
- Settings → Domains
- Add your domain
- Update DNS records

---

## Option 4: Netlify

Netlify is primarily for static sites, but can work with serverless functions.

### Steps:

1. **Convert API to Netlify Functions**
   Create `netlify/functions/` directory and convert endpoints.

2. **Create `netlify.toml`**
   ```toml
   [build]
     publish = "public"
     functions = "netlify/functions"

   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
   ```

3. **Deploy**
   ```bash
   npm i -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

4. **Configure Environment Variables**
   - Netlify Dashboard → Site settings → Environment variables

---

## Option 5: AWS (EC2 + Nginx)

### Steps:

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t2.micro (free tier)
   - Configure security groups (HTTP, HTTPS, SSH)

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt-get install -y git
   ```

4. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd duticalls-marketing-site
   npm install
   ```

5. **Create Environment File**
   ```bash
   cp .env.example .env
   nano .env
   # Add your configuration
   ```

6. **Install PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start backend/server.js --name duticalls
   pm2 startup
   pm2 save
   ```

7. **Install Nginx**
   ```bash
   sudo apt-get install -y nginx
   ```

8. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/duticalls
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/duticalls /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. **Setup SSL with Let's Encrypt**
    ```bash
    sudo apt-get install -y certbot python3-certbot-nginx
    sudo certbot --nginx -d your-domain.com -d www.your-domain.com
    ```

---

## CMS Deployment

### Deploy Strapi

#### Option A: Heroku
```bash
cd cms-integration/blog-cms
heroku create duticalls-cms
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

#### Option B: DigitalOcean
1. Create App from GitHub repo
2. Add PostgreSQL database
3. Configure environment variables
4. Deploy

#### Option C: Railway
1. Connect GitHub repo
2. Add PostgreSQL plugin
3. Deploy automatically

### Update Backend
After CMS deployment, update `.env`:
```env
CMS_API_URL=https://your-strapi-app.herokuapp.com/api
CMS_API_TOKEN=<production-token>
```

---

## Post-Deployment Checklist

### 1. Test All Pages
- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Forms submit successfully
- [ ] Blog posts load from CMS
- [ ] Mobile responsiveness works
- [ ] All images load

### 2. Configure DNS
- [ ] Point domain to hosting
- [ ] Add www subdomain
- [ ] Setup SSL certificate
- [ ] Test HTTPS

### 3. Setup Monitoring
- [ ] Google Analytics
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring (UptimeRobot)

### 4. SEO Setup
- [ ] Submit sitemap to Google
- [ ] Verify Google Search Console
- [ ] Add robots.txt
- [ ] Test meta tags

### 5. Security
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Setup firewall rules
- [ ] Regular backups

### 6. Performance
- [ ] Enable compression
- [ ] Setup CDN (Cloudflare)
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Enable caching

---

## Environment Variables Reference

```env
# Required
NODE_ENV=production
PORT=3000

# CMS (Required for blog)
CMS_API_URL=https://your-cms.com/api
CMS_API_TOKEN=your_token_here

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NOTIFICATION_EMAIL=admin@duticalls.com

# Database (Optional)
DATABASE_URL=postgresql://user:pass@host:5432/db

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X

# Third-party (Optional)
MAILCHIMP_API_KEY=your_key
MAILCHIMP_LIST_ID=your_list_id
```

---

## Troubleshooting

### Site Not Loading
1. Check server logs
2. Verify environment variables
3. Test API endpoints
4. Check DNS configuration

### Forms Not Working
1. Check API endpoints
2. Verify CORS settings
3. Check browser console
4. Test with curl/Postman

### Blog Not Loading
1. Verify CMS is running
2. Check API token
3. Test CMS API directly
4. Check CORS on CMS

### SSL Certificate Issues
1. Verify domain ownership
2. Check DNS propagation
3. Renew certificates
4. Check redirect rules

---

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review server logs weekly
- Backup database daily
- Monitor uptime 24/7
- Update content regularly

### Security Updates
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Update dependencies
npm update
```

---

## Support

For deployment assistance:
- Email: support@duticalls.com
- Documentation: See README.md
- Issues: Create GitHub issue

---

## Estimated Costs

### Free Tier Options
- Vercel: Free for personal projects
- Netlify: Free (100GB bandwidth)
- Heroku: Free dyno (limited hours)
- Railway: Free trial

### Paid Options
- Vercel Pro: $20/month
- DigitalOcean: $5-10/month
- AWS: $10-50/month
- Heroku: $7/month per dyno

### Total Monthly (Recommended Setup)
- Hosting: $10-20
- CMS: $5-15
- Domain: $1-2
- Email: Free (using Gmail)
- **Total: ~$20-40/month**

---

Good luck with your deployment! 🚀
