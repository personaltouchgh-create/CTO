# DutiCalls Marketing Website

A comprehensive multi-page marketing website for DutiCalls HRM SaaS platform, built with plain HTML/CSS and Node.js backend.

## 🌟 Features

- **9 Complete Pages**: Home, Features, Pricing, About, Contact, Blog, FAQ, Demo Request, Book Appointment
- **Responsive Design**: Mobile-first approach with full tablet and desktop support
- **Blue/White/Gray Color Scheme**: Professional and modern design
- **Interactive Elements**: Animated sections, accordions, toggles, and form validations
- **Headless CMS Integration**: Ready for Strapi or Contentful blog management
- **Form Backend**: Express.js API for handling all form submissions
- **Video Embeds**: YouTube video integration for product demos
- **SEO Optimized**: Semantic HTML, meta tags, and structured content

## 📁 Project Structure

```
duticalls-marketing-site/
├── public/
│   ├── css/
│   │   ├── main.css              # Main stylesheet
│   │   └── responsive.css        # Responsive design
│   ├── js/
│   │   ├── main.js              # Core JavaScript
│   │   ├── forms.js             # Form handling
│   │   ├── pricing.js           # Pricing toggle
│   │   ├── faq.js               # FAQ accordion
│   │   └── blog.js              # Blog CMS integration
│   ├── images/                   # Image assets
│   ├── index.html               # Home page
│   ├── features.html            # Features page
│   ├── pricing.html             # Pricing page
│   ├── about.html               # About page
│   ├── contact.html             # Contact page
│   ├── blog.html                # Blog listing
│   ├── faq.html                 # FAQ page
│   ├── demo-request.html        # Demo request form
│   └── book-appointment.html    # Appointment booking
├── backend/
│   └── server.js                # Express server
├── cms-integration/
│   └── STRAPI_SETUP.md         # CMS setup guide
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd duticalls-marketing-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   CMS_API_URL=http://localhost:1337/api
   CMS_API_TOKEN=your_token_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📄 Pages Overview

### 1. Home Page (`index.html`)
- Hero section with CTA buttons
- Key benefits showcase
- Video demo section
- Features preview
- Customer testimonials
- Final CTA section

### 2. Features Page (`features.html`)
- Detailed feature descriptions
- Core features with visuals
- Additional features grid
- Premium add-ons section
- Feature benefits lists

### 3. Pricing Page (`pricing.html`)
- Three pricing tiers (Starter, Professional, Enterprise)
- Monthly/Yearly toggle
- Feature comparison table
- Premium add-ons pricing
- Pricing FAQs

### 4. About Page (`about.html`)
- Company story
- Mission and vision
- Core values
- Leadership team
- Company statistics

### 5. Contact Page (`contact.html`)
- Contact form
- Contact information
- Office location
- Business hours
- Social media links

### 6. Blog Page (`blog.html`)
- Featured article
- Blog post grid
- Category filters
- Pagination
- Newsletter signup
- CMS integration ready

### 7. FAQ Page (`faq.html`)
- Categorized questions (General, Features, Pricing, Technical, Security)
- Accordion interface
- Category filtering
- Search functionality ready

### 8. Demo Request Page (`demo-request.html`)
- Comprehensive demo request form
- Benefits of requesting demo
- Scheduling options
- Trust indicators

### 9. Book Appointment Page (`book-appointment.html`)
- Appointment booking form
- Meeting type selection
- Calendar integration ready
- Meeting platform preferences

## 🎨 Design System

### Color Palette

```css
Primary Blue:   #2563eb
Dark Blue:      #1d4ed8
Light Blue:     #e8f4fd
Gray Scale:     #111827 to #f9fafb
White:          #ffffff
Success:        #10b981
Warning:        #f59e0b
Error:          #ef4444
```

### Typography

- Font Family: System fonts (-apple-system, Segoe UI, Roboto)
- Headings: Bold, varied sizes
- Body: 16px base, 1.6 line-height

### Components

- Buttons: Primary, Secondary, Outline variants
- Cards: Shadow, hover effects
- Forms: Validated inputs, error states
- Navigation: Sticky header, mobile menu

## 🔌 API Endpoints

### Contact Form
```
POST /api/contact
Body: { name, email, company, phone, subject, message }
```

### Demo Request
```
POST /api/demo-request
Body: { firstName, lastName, email, phone, company, ... }
```

### Book Appointment
```
POST /api/book-appointment
Body: { meetingType, firstName, lastName, email, ... }
```

### Newsletter Subscription
```
POST /api/newsletter
Body: { email }
```

### Blog Posts (CMS Integration)
```
GET /api/blog-posts?category=all&page=1&limit=6
Response: { posts, currentPage, totalPages, totalPosts }
```

### Health Check
```
GET /api/health
Response: { status: "OK", timestamp }
```

## 📝 CMS Setup

### Using Strapi (Recommended)

1. Follow the guide in `cms-integration/STRAPI_SETUP.md`
2. Create blog post content type
3. Configure API permissions
4. Generate API token
5. Update `.env` with CMS credentials

### Using Contentful

1. Create account at contentful.com
2. Set up content models
3. Add content
4. Get API keys
5. Update backend integration

See `cms-integration/STRAPI_SETUP.md` for detailed instructions.

## 🔧 Configuration

### Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development

# CMS
CMS_API_URL=http://localhost:1337/api
CMS_API_TOKEN=your_cms_token

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password
NOTIFICATION_EMAIL=admin@duticalls.com
```

### Customization

**Change Colors:**
Edit CSS variables in `public/css/main.css`:
```css
:root {
    --primary-blue: #2563eb;
    --primary-blue-dark: #1d4ed8;
    /* ... */
}
```

**Update Content:**
- Edit HTML files directly for static content
- Use CMS for blog posts
- Update form fields in respective HTML files

**Add Pages:**
1. Create new HTML file in `public/`
2. Add navigation link to header
3. Follow existing page structure
4. Update `server.js` if API needed

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1399px
- Large Desktop: 1400px+

## 🚢 Deployment

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create duticalls-marketing

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set CMS_API_URL=your_cms_url
heroku config:set CMS_API_TOKEN=your_token

# Deploy
git push heroku main

# Open app
heroku open
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

### Deploy to DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build settings:
   - Build Command: `npm install`
   - Run Command: `npm start`
3. Set environment variables
4. Deploy

### Deploy to Netlify (Static + Functions)

1. Connect repository
2. Build settings:
   - Build command: `npm run build` (if needed)
   - Publish directory: `public`
3. Add Netlify Functions for API
4. Deploy

## 🔒 Security

- Input validation on all forms
- CORS configuration
- Environment variable protection
- XSS prevention
- CSRF protection (add tokens in production)
- Rate limiting (implement for production)

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Check for issues
npm run lint
```

## 📈 Performance

- Minify CSS/JS for production
- Optimize images
- Enable gzip compression
- Use CDN for static assets
- Implement caching headers
- Lazy load images

## 🐛 Troubleshooting

**Server won't start:**
- Check if port 3000 is available
- Verify Node.js version (14+)
- Check for missing dependencies

**Forms not submitting:**
- Check console for errors
- Verify API endpoints are running
- Check CORS configuration

**Blog posts not loading:**
- Ensure CMS is running
- Verify API token
- Check network requests

**Styles not loading:**
- Clear browser cache
- Check CSS file paths
- Verify server is serving static files

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Strapi Documentation](https://docs.strapi.io/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For support, email support@duticalls.com or create an issue in the repository.

## 🙏 Acknowledgments

- Design inspiration from modern SaaS websites
- Icons and graphics: Custom SVG illustrations
- Fonts: System fonts for optimal performance

---

Built with ❤️ for DutiCalls HRM Platform
