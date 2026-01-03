// Blog CMS Integration
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            loadBlogPosts(filter);
        });
    });
    
    // Pagination
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => changePage(-1));
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => changePage(1));
    }
});

let currentPage = 1;
let currentFilter = 'all';

// Load Blog Posts from CMS
async function loadBlogPosts(filter = 'all', page = 1) {
    currentFilter = filter;
    currentPage = page;
    
    const container = document.getElementById('blogPostsContainer');
    container.innerHTML = '<div class="loading-message">Loading blog posts...</div>';
    
    try {
        // API endpoint for blog posts (will be configured with CMS)
        const response = await fetch(`/api/blog-posts?category=${filter}&page=${page}`);
        
        if (response.ok) {
            const data = await response.json();
            displayBlogPosts(data.posts);
            updatePagination(data.currentPage, data.totalPages);
        } else {
            // Fallback to sample posts if API not available
            displaySamplePosts();
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
        displaySamplePosts();
    }
}

// Display Blog Posts
function displayBlogPosts(posts) {
    const container = document.getElementById('blogPostsContainer');
    
    if (posts.length === 0) {
        container.innerHTML = '<div class="loading-message">No posts found.</div>';
        return;
    }
    
    container.innerHTML = posts.map(post => `
        <article class="blog-card">
            <div class="blog-card-image">
                <img src="${post.image || '/images/blog-placeholder.jpg'}" alt="${post.title}">
            </div>
            <div class="blog-card-content">
                <span class="post-category">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-author">By ${post.author}</span>
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-read-time">${post.readTime} min read</span>
                </div>
                <a href="${post.url}" class="btn btn-outline">Read More</a>
            </div>
        </article>
    `).join('');
}

// Display Sample Posts (Fallback)
function displaySamplePosts() {
    const samplePosts = [
        {
            title: '10 Best Practices for Remote Workforce Management',
            excerpt: 'Learn how to effectively manage remote teams with these proven strategies and tools.',
            category: 'Workforce Management',
            author: 'Sarah Mitchell',
            date: '2024-01-10',
            readTime: 7,
            image: '',
            url: '#'
        },
        {
            title: 'How to Improve Employee Attendance with Technology',
            excerpt: 'Discover how modern attendance tracking technology can reduce absenteeism and improve punctuality.',
            category: 'HR Best Practices',
            author: 'David Park',
            date: '2024-01-08',
            readTime: 5,
            image: '',
            url: '#'
        },
        {
            title: 'The Future of HR: AI and Automation',
            excerpt: 'Explore how artificial intelligence is transforming human resources and what it means for your organization.',
            category: 'Technology',
            author: 'Maria Garcia',
            date: '2024-01-05',
            readTime: 8,
            image: '',
            url: '#'
        },
        {
            title: 'Building a Productive Hybrid Workplace',
            excerpt: 'Tips and strategies for creating an effective hybrid work environment that boosts productivity.',
            category: 'Productivity',
            author: 'James Wilson',
            date: '2024-01-03',
            readTime: 6,
            image: '',
            url: '#'
        },
        {
            title: 'Compliance and Security in Modern HRM Systems',
            excerpt: 'Understanding the importance of data security and regulatory compliance in workforce management.',
            category: 'HR Best Practices',
            author: 'Sarah Mitchell',
            date: '2023-12-28',
            readTime: 9,
            image: '',
            url: '#'
        },
        {
            title: 'Maximizing ROI with Workforce Analytics',
            excerpt: 'Learn how to use data analytics to make better decisions and improve workforce efficiency.',
            category: 'Productivity',
            author: 'David Park',
            date: '2023-12-25',
            readTime: 7,
            image: '',
            url: '#'
        }
    ];
    
    displayBlogPosts(samplePosts);
    updatePagination(1, 1);
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Update Pagination
function updatePagination(currentPage, totalPages) {
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
        prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
    }
}

// Change Page
function changePage(direction) {
    const newPage = currentPage + direction;
    loadBlogPosts(currentFilter, newPage);
}

// Add CSS for blog cards
const style = document.createElement('style');
style.textContent = `
    .blog-card {
        background-color: var(--white);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        overflow: hidden;
        transition: var(--transition);
    }
    
    .blog-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--box-shadow-lg);
    }
    
    .blog-card-image {
        width: 100%;
        height: 200px;
        background-color: var(--light-blue);
        overflow: hidden;
    }
    
    .blog-card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .blog-card-content {
        padding: 1.5rem;
    }
    
    .blog-card-content h3 {
        font-size: 1.25rem;
        color: var(--gray-900);
        margin-bottom: 0.75rem;
    }
    
    .blog-card-content p {
        color: var(--gray-600);
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    .blog-card-content .post-meta {
        font-size: 0.85rem;
        margin-bottom: 1rem;
    }
`;
document.head.appendChild(style);
