# Strapi CMS Setup for DutiCalls Blog

This guide will help you set up Strapi as a headless CMS for the DutiCalls blog.

## Prerequisites

- Node.js 14.x or higher
- npm or yarn
- PostgreSQL, MySQL, or SQLite (for database)

## Installation Steps

### 1. Create Strapi Project

```bash
# Navigate to cms-integration directory
cd cms-integration

# Create new Strapi project
npx create-strapi-app@latest blog-cms --quickstart

# Or with specific database
npx create-strapi-app@latest blog-cms --dbclient=postgres
```

### 2. Start Strapi

```bash
cd blog-cms
npm run develop
```

Strapi will start at `http://localhost:1337`

### 3. Create Admin Account

- Open `http://localhost:1337/admin`
- Create your admin account
- You'll be redirected to the admin panel

### 4. Create Content Types

#### Blog Post Content Type

Create a new Collection Type called "Blog Post" with the following fields:

**Fields:**
- `title` (Text, Required, Short text)
- `slug` (UID, Required, attached to title)
- `excerpt` (Text, Required, Long text, max 300 chars)
- `content` (Rich text, Required)
- `featuredImage` (Media, Single image)
- `category` (Enumeration: workforce, hr, productivity, technology)
- `author` (Text, Required)
- `readTime` (Number, Integer, Required)
- `publishedDate` (Date, Required)
- `tags` (JSON or Relation to Tags collection)
- `featured` (Boolean, default: false)
- `metaTitle` (Text, for SEO)
- `metaDescription` (Text, for SEO)

#### Author Content Type (Optional)

Create a new Collection Type called "Author":

**Fields:**
- `name` (Text, Required)
- `bio` (Text, Long text)
- `avatar` (Media, Single image)
- `email` (Email)
- `position` (Text)

#### Category Content Type (Optional)

Create a new Collection Type called "Category":

**Fields:**
- `name` (Text, Required, Unique)
- `slug` (UID, Required)
- `description` (Text)

### 5. Configure API Permissions

1. Go to Settings → Users & Permissions plugin → Roles
2. Select "Public" role
3. Enable the following permissions:
   - Blog Post: find, findOne
   - Author: find, findOne
   - Category: find, findOne
4. Save changes

### 6. Create API Token (for backend integration)

1. Go to Settings → API Tokens
2. Click "Create new API Token"
3. Name: "DutiCalls Backend"
4. Token type: Read-only
5. Save and copy the token
6. Add to your `.env` file:
   ```
   CMS_API_TOKEN=your_token_here
   ```

### 7. Add Sample Blog Posts

Create 5-10 sample blog posts with:
- Compelling titles
- Well-written excerpts
- Rich content
- Featured images (use placeholder images or stock photos)
- Appropriate categories
- Realistic read times (5-10 minutes)

## API Integration

### Endpoints

**Get all blog posts:**
```
GET http://localhost:1337/api/blog-posts?populate=*
```

**Get posts by category:**
```
GET http://localhost:1337/api/blog-posts?filters[category][$eq]=workforce&populate=*
```

**Get single post:**
```
GET http://localhost:1337/api/blog-posts/:id?populate=*
```

**With pagination:**
```
GET http://localhost:1337/api/blog-posts?pagination[page]=1&pagination[pageSize]=6&populate=*
```

### Backend Integration

Update `backend/server.js` blog endpoint:

```javascript
app.get('/api/blog-posts', async (req, res) => {
    const { category = 'all', page = 1, limit = 6 } = req.query;
    
    try {
        const cmsUrl = process.env.CMS_API_URL || 'http://localhost:1337/api';
        const token = process.env.CMS_API_TOKEN;
        
        let url = `${cmsUrl}/blog-posts?pagination[page]=${page}&pagination[pageSize]=${limit}&populate=*`;
        
        if (category !== 'all') {
            url += `&filters[category][$eq]=${category}`;
        }
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        res.status(200).json({
            posts: data.data.map(item => ({
                id: item.id,
                title: item.attributes.title,
                excerpt: item.attributes.excerpt,
                category: item.attributes.category,
                author: item.attributes.author,
                date: item.attributes.publishedDate,
                readTime: item.attributes.readTime,
                image: item.attributes.featuredImage?.data?.attributes?.url || '',
                url: `/blog/${item.attributes.slug}`
            })),
            currentPage: data.meta.pagination.page,
            totalPages: data.meta.pagination.pageCount,
            totalPosts: data.meta.pagination.total
        });
    } catch (error) {
        console.error('Error fetching from CMS:', error);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});
```

## Deployment

### Deploy Strapi

Options:
1. **Heroku**: Follow [Strapi Heroku guide](https://docs.strapi.io/dev-docs/deployment/heroku)
2. **DigitalOcean**: Use App Platform or Droplet
3. **AWS**: Use EC2 or Elastic Beanstalk
4. **Render**: Free tier available

### Update Environment Variables

After deployment, update your `.env`:
```
CMS_API_URL=https://your-strapi-instance.com/api
CMS_API_TOKEN=your_production_token
```

## Alternative: Contentful Setup

If you prefer Contentful over Strapi:

1. Sign up at [contentful.com](https://www.contentful.com/)
2. Create a new space
3. Create Content Model for "Blog Post" with similar fields
4. Add content
5. Get API keys from Settings → API keys
6. Update backend to use Contentful SDK

```javascript
const contentful = require('contentful');

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});
```

## Troubleshooting

**CORS Issues:**
Add your frontend domain to Strapi's CORS configuration in `config/middleware.js`

**Images not loading:**
Ensure `populate=*` is included in API calls, or populate specifically: `populate=featuredImage`

**Authentication errors:**
Verify API token is correct and has proper permissions

## Additional Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
