// Snipcart event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Listen for Snipcart events
    document.addEventListener('snipcart.ready', function() {
        console.log('Snipcart is ready');
    });
    
    document.addEventListener('snipcart.cart.open', function() {
        console.log('Cart opened');
    });
    
    document.addEventListener('snipcart.cart.close', function() {
        console.log('Cart closed');
    });
    
    document.addEventListener('snipcart.cart.item.added', function(event) {
        const item = event.detail.item;
        showNotification(`${item.name} added to cart`, 'success');
    });
    
    document.addEventListener('snipcart.cart.item.removed', function(event) {
        const item = event.detail.item;
        showNotification(`${item.name} removed from cart`, 'info');
    });
    
    document.addEventListener('snipcart.cart.item.updated', function(event) {
        const item = event.detail.item;
        showNotification(`${item.name} quantity updated`, 'info');
    });
    
    document.addEventListener('snipcart.checkout.completed', function(event) {
        const order = event.detail.order;
        showNotification('Thank you for your order!', 'success');
    });
});

// Notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    } text-white`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Thank you for subscribing!';
    successMessage.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        z-index: 1000;
    `;
    document.body.appendChild(successMessage);
    
    // Clear form
    newsletterForm.reset();
    
    setTimeout(() => {
        successMessage.remove();
    }, 2000);
});

// Active section highlighting for navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
} 