# Quick Start Guide - DutiCalls Marketing Website

Get your DutiCalls marketing website up and running in 5 minutes!

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies (1 minute)
```bash
npm install
```

### Step 2: Start the Server (30 seconds)
```bash
npm start
```

### Step 3: Open in Browser (10 seconds)
Open your browser and go to:
```
http://localhost:3000
```

**That's it!** Your marketing website is now running.

---

## 📋 What You Get Out of the Box

✅ **9 Complete Pages:**
- Home (Hero, Benefits, Testimonials)
- Features (Detailed feature descriptions)
- Pricing (3 tiers with toggle)
- About (Company story and team)
- Contact (Working contact form)
- Blog (Ready for CMS integration)
- FAQ (Accordion with categories)
- Demo Request (Lead capture form)
- Book Appointment (Scheduling form)

✅ **Fully Responsive:**
- Mobile, Tablet, Desktop optimized
- Touch-friendly navigation

✅ **Working Forms:**
- All forms submit to backend API
- Email validation
- Error handling
- Success messages

✅ **Professional Design:**
- Blue/White/Gray color scheme
- Modern animations
- Smooth transitions

---

## 🎯 Next Steps

### 1. Customize Content (5-10 minutes)

**Update Company Info:**
Edit the HTML files in `/public` directory to update:
- Company name
- Contact information
- Pricing details
- Feature descriptions

**Quick changes:**
- `public/index.html` - Hero title and description
- `public/about.html` - Company story and team
- `public/pricing.html` - Pricing tiers and features
- `public/contact.html` - Contact details

### 2. Add Your Branding (5 minutes)

**Logo:**
1. Replace the `<h1>DutiCalls</h1>` in header with your logo
2. Add your logo image to `public/images/`
3. Update all page headers

**Colors:**
Edit `public/css/main.css`:
```css
:root {
    --primary-blue: #2563eb;  /* Change to your brand color */
    --primary-blue-dark: #1d4ed8;
    /* ... */
}
```

### 3. Setup Blog (Optional - 15 minutes)

If you want a blog, follow: `cms-integration/STRAPI_SETUP.md`

**Quick Strapi Setup:**
```bash
cd cms-integration
npx create-strapi-app@latest blog-cms --quickstart
```

### 4. Configure Forms (5 minutes)

Forms work out of the box! But you may want to:

**Add email notifications:**
1. Copy `.env.example` to `.env`
2. Add your email settings:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NOTIFICATION_EMAIL=admin@duticalls.com
```

### 5. Deploy (10 minutes)

**Easiest: Vercel**
```bash
npm i -g vercel
vercel
```

See `DEPLOYMENT.md` for other options.

---

## 📝 Common Customizations

### Change Hero Title
**File:** `public/index.html`
```html
<h1 class="hero-title">Your Custom Title Here</h1>
```

### Update Features
**File:** `public/features.html`
- Edit feature descriptions
- Add/remove features
- Update feature icons

### Modify Pricing
**File:** `public/pricing.html`
- Change price amounts
- Update feature lists
- Add/remove plans

### Update Footer
All HTML files have footer - edit once, copy to all:
```html
<footer class="main-footer">
    <!-- Update company info here -->
</footer>
```

---

## 🔍 Testing Checklist

- [ ] Home page loads
- [ ] All navigation links work
- [ ] Mobile menu opens/closes
- [ ] Contact form submits
- [ ] Demo request form works
- [ ] Pricing toggle works
- [ ] FAQ accordion opens
- [ ] All pages are responsive
- [ ] Forms show success messages

---

## 🆘 Quick Troubleshooting

**Server won't start?**
```bash
# Check if port 3000 is in use
lsof -i :3000
# Or use different port
PORT=3001 npm start
```

**Forms not working?**
- Check browser console for errors
- Ensure server is running
- Verify API endpoints: http://localhost:3000/api/health

**Styles not loading?**
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
- Check `public/css/` files exist
- Verify file paths in HTML

**Blog not loading?**
- You need to setup Strapi CMS first
- See `cms-integration/STRAPI_SETUP.md`
- Or it will show sample posts

---

## 📚 File Structure Quick Reference

```
project/
├── public/              # Frontend files
│   ├── *.html          # All pages
│   ├── css/            # Stylesheets
│   └── js/             # JavaScript
├── backend/            
│   └── server.js       # API server
├── package.json        # Dependencies
├── README.md           # Full documentation
└── DEPLOYMENT.md       # Deploy guide
```

---

## 🎨 Quick Design Reference

**Colors:**
- Primary: `#2563eb` (Blue)
- Dark: `#1d4ed8` (Dark Blue)
- Light: `#e8f4fd` (Light Blue)
- Gray: `#111827` to `#f9fafb`

**Spacing:**
- Small: `1rem` (16px)
- Medium: `2rem` (32px)
- Large: `4rem` (64px)

**Breakpoints:**
- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 769px

---

## 💡 Pro Tips

1. **Test on Mobile First**
   - Open Chrome DevTools
   - Toggle device toolbar
   - Test all forms

2. **Use Real Content**
   - Replace lorem ipsum ASAP
   - Add real images
   - Use actual company info

3. **Optimize Images**
   - Use WebP format
   - Compress before uploading
   - Max width: 1920px

4. **SEO Basics**
   - Update page titles
   - Add meta descriptions
   - Use semantic HTML

5. **Performance**
   - Minify CSS/JS for production
   - Enable gzip compression
   - Use CDN for images

---

## 🎯 Goal-Based Quick Starts

**"I just want to see it running"**
```bash
npm install && npm start
```
Open http://localhost:3000

**"I want to customize content"**
1. `npm install && npm start`
2. Edit files in `public/` directory
3. Refresh browser (changes appear immediately)

**"I want to deploy it"**
1. `npm install`
2. Push to GitHub
3. Connect to Vercel
4. Done!

**"I want a working blog"**
1. Follow this guide
2. Then: `cms-integration/STRAPI_SETUP.md`
3. Update `.env` with CMS URL
4. Restart server

---

## ⚡ Keyboard Shortcuts for Development

- `Ctrl+C` - Stop server
- `Ctrl+F5` - Hard refresh browser
- `Ctrl+Shift+I` - Open DevTools
- `Ctrl+Shift+M` - Toggle mobile view

---

## 📞 Need Help?

1. Check `README.md` for detailed docs
2. Check `DEPLOYMENT.md` for deploy help
3. Check browser console for errors
4. Check server logs in terminal
5. Create an issue on GitHub

---

## ✨ You're Ready!

Your DutiCalls marketing website is set up and ready to go.

**Next:** 
- Customize content
- Add your branding
- Deploy to production
- Start getting leads!

Happy building! 🚀
