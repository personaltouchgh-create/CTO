// FAQ Accordion and Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // FAQ Category Filtering
    const categoryButtons = document.querySelectorAll('.faq-category');
    const faqContents = document.querySelectorAll('.faq-content');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            faqContents.forEach(content => {
                if (content.getAttribute('data-content') === category) {
                    content.style.display = 'block';
                    // Reset all FAQ items in this category
                    content.querySelectorAll('.faq-item').forEach(item => {
                        item.classList.remove('active');
                    });
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
});
