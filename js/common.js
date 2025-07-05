// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('[aria-label="Toggle mobile menu"]');
    const mobileMenu = document.querySelector('.md\\:hidden.hidden');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Image optimization
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        // Add loading="lazy" to images below the fold
        if (img.getBoundingClientRect().top > window.innerHeight) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            this.src = '/images/placeholder.svg';
            this.alt = 'Image failed to load';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Initialize Snipcart
    if (typeof Snipcart !== 'undefined') {
        Snipcart.api.cart.on('item.added', function(item) {
            // Update cart count
            const cartCount = document.querySelector('.snipcart-items-count');
            if (cartCount) {
                cartCount.textContent = Snipcart.api.cart.items().length;
            }
        });
    }
}); 