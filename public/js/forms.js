// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Demo Request Form
    const demoForm = document.getElementById('demoRequestForm');
    if (demoForm) {
        demoForm.addEventListener('submit', handleDemoForm);
    }
    
    // Appointment Form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentForm);
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
});

// Contact Form Handler
async function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const messageDiv = document.getElementById('formMessage');
    
    // Disable submit button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';
            e.target.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Sorry, there was an error sending your message. Please try again or email us directly at support@duticalls.com';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

// Demo Request Form Handler
async function handleDemoForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const messageDiv = document.getElementById('formMessage');
    
    // Disable submit button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
        const response = await fetch('/api/demo-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Thank you for requesting a demo! Our team will contact you within 24 hours to schedule your personalized demonstration.';
            e.target.reset();
        } else {
            throw new Error('Failed to submit demo request');
        }
    } catch (error) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Sorry, there was an error submitting your request. Please try again or contact us directly.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request Demo';
    }
}

// Appointment Form Handler
async function handleAppointmentForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const messageDiv = document.getElementById('formMessage');
    
    // Disable submit button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Booking...';
    
    try {
        const response = await fetch('/api/book-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Your appointment has been booked! You\'ll receive a calendar invitation within 2 hours.';
            e.target.reset();
        } else {
            throw new Error('Failed to book appointment');
        }
    } catch (error) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Sorry, there was an error booking your appointment. Please try again or contact us directly.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Book Appointment';
    }
}

// Newsletter Form Handler
async function handleNewsletterForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Thank you for subscribing! Check your email to confirm your subscription.');
            e.target.reset();
        } else {
            throw new Error('Failed to subscribe');
        }
    } catch (error) {
        alert('Sorry, there was an error with your subscription. Please try again.');
    }
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Add real-time validation
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = 'var(--error)';
        } else {
            this.style.borderColor = '';
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = 'var(--error)';
        } else {
            this.style.borderColor = '';
        }
    });
});
