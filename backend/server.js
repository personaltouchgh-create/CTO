const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// In-memory storage (replace with database in production)
const submissions = {
    contacts: [],
    demoRequests: [],
    appointments: [],
    newsletter: []
};

// API Routes

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, company, phone, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Store submission
    const submission = {
        id: Date.now(),
        name,
        email,
        company,
        phone,
        subject,
        message,
        timestamp: new Date().toISOString()
    };
    
    submissions.contacts.push(submission);
    
    // In production, send email notification here
    console.log('Contact Form Submission:', submission);
    
    res.status(200).json({ 
        success: true, 
        message: 'Contact form submitted successfully' 
    });
});

// Demo Request Endpoint
app.post('/api/demo-request', (req, res) => {
    const { 
        firstName, 
        lastName, 
        email, 
        phone, 
        company, 
        companySize, 
        industry,
        preferredDate,
        preferredTime,
        timezone,
        challenges
    } = req.body;
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !company) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Store submission
    const submission = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phone,
        company,
        companySize,
        industry,
        preferredDate,
        preferredTime,
        timezone,
        challenges,
        timestamp: new Date().toISOString()
    };
    
    submissions.demoRequests.push(submission);
    
    // In production, send email notification and calendar invite
    console.log('Demo Request Submission:', submission);
    
    res.status(200).json({ 
        success: true, 
        message: 'Demo request submitted successfully' 
    });
});

// Book Appointment Endpoint
app.post('/api/book-appointment', (req, res) => {
    const { 
        meetingType,
        firstName, 
        lastName, 
        email, 
        phone, 
        company,
        jobTitle,
        companySize,
        appointmentDate,
        appointmentTime,
        timezone,
        meetingPlatform,
        topics,
        additionalNotes
    } = req.body;
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !company || !appointmentDate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Store submission
    const submission = {
        id: Date.now(),
        meetingType,
        firstName,
        lastName,
        email,
        phone,
        company,
        jobTitle,
        companySize,
        appointmentDate,
        appointmentTime,
        timezone,
        meetingPlatform,
        topics,
        additionalNotes,
        timestamp: new Date().toISOString()
    };
    
    submissions.appointments.push(submission);
    
    // In production, create calendar event and send invites
    console.log('Appointment Booking:', submission);
    
    res.status(200).json({ 
        success: true, 
        message: 'Appointment booked successfully' 
    });
});

// Newsletter Subscription Endpoint
app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    
    // Validation
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    
    // Check if already subscribed
    const existing = submissions.newsletter.find(sub => sub.email === email);
    if (existing) {
        return res.status(400).json({ error: 'Email already subscribed' });
    }
    
    // Store subscription
    const subscription = {
        id: Date.now(),
        email,
        timestamp: new Date().toISOString(),
        confirmed: false
    };
    
    submissions.newsletter.push(subscription);
    
    // In production, send confirmation email
    console.log('Newsletter Subscription:', subscription);
    
    res.status(200).json({ 
        success: true, 
        message: 'Subscribed successfully' 
    });
});

// Blog Posts Endpoint (CMS Integration)
app.get('/api/blog-posts', async (req, res) => {
    const { category = 'all', page = 1, limit = 6 } = req.query;
    
    try {
        // In production, fetch from headless CMS (Strapi, Contentful, etc.)
        // For now, return sample data
        const samplePosts = [
            {
                id: 1,
                title: '10 Best Practices for Remote Workforce Management',
                excerpt: 'Learn how to effectively manage remote teams with these proven strategies and tools.',
                category: 'workforce',
                author: 'Sarah Mitchell',
                date: '2024-01-10',
                readTime: 7,
                image: '/images/blog1.jpg',
                url: '/blog/remote-workforce-management'
            },
            {
                id: 2,
                title: 'How to Improve Employee Attendance with Technology',
                excerpt: 'Discover how modern attendance tracking technology can reduce absenteeism.',
                category: 'hr',
                author: 'David Park',
                date: '2024-01-08',
                readTime: 5,
                image: '/images/blog2.jpg',
                url: '/blog/improve-employee-attendance'
            },
            {
                id: 3,
                title: 'The Future of HR: AI and Automation',
                excerpt: 'Explore how artificial intelligence is transforming human resources.',
                category: 'technology',
                author: 'Maria Garcia',
                date: '2024-01-05',
                readTime: 8,
                image: '/images/blog3.jpg',
                url: '/blog/future-of-hr-ai'
            }
        ];
        
        // Filter by category
        let filteredPosts = category === 'all' 
            ? samplePosts 
            : samplePosts.filter(post => post.category === category);
        
        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
        
        res.status(200).json({
            posts: paginatedPosts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(filteredPosts.length / limit),
            totalPosts: filteredPosts.length
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});

// Admin endpoint to view submissions (for development only)
app.get('/api/admin/submissions', (req, res) => {
    // In production, add authentication
    res.status(200).json(submissions);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve HTML files for all routes
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, '../public', req.path);
    
    // Check if file exists
    if (filePath.endsWith('.html')) {
        res.sendFile(filePath, (err) => {
            if (err) {
                res.sendFile(path.join(__dirname, '../public/index.html'));
            }
        });
    } else {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`DutiCalls Marketing Site running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

module.exports = app;
