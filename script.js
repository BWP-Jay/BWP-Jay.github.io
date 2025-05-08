// Initialize Snipcart and handle cart-related events
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count
    if (typeof Snipcart !== 'undefined') {
        updateCartCount();
    }

    // Handle mini cart hover
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('mouseenter', () => {
            const miniCart = document.querySelector('.mini-cart');
            if (miniCart) {
                miniCart.classList.remove('hidden');
            }
        });

        cartIcon.addEventListener('mouseleave', () => {
            const miniCart = document.querySelector('.mini-cart');
            if (miniCart) {
                miniCart.classList.add('hidden');
            }
        });
    }
});

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.snipcart-items-count');
    if (cartCount && typeof Snipcart !== 'undefined') {
        cartCount.textContent = Snipcart.api.cart.items().length;
    }
}

// Listen for Snipcart events
document.addEventListener('snipcart.ready', () => {
    updateCartCount();
});

document.addEventListener('snipcart.cart.item.added', () => {
    updateCartCount();
});

document.addEventListener('snipcart.cart.item.removed', () => {
    updateCartCount();
});

// Mini cart functionality
const viewCartBtn = document.querySelector('.view-cart-btn');
if (viewCartBtn) {
    viewCartBtn.addEventListener('click', () => {
        Snipcart.api.cart.open();
    });
}

document.addEventListener('snipcart.cart.open', function() {
    console.log('Cart opened');
});

document.addEventListener('snipcart.cart.close', function() {
    console.log('Cart closed');
});

document.addEventListener('snipcart.cart.item.updated', function(event) {
    const item = event.detail.item;
    updateCartCount();
    showNotification(`${item.name} quantity updated`, 'info');
});

document.addEventListener('snipcart.checkout.completed', function(event) {
    const order = event.detail.order;
    updateCartCount();
    showNotification('Thank you for your order!', 'success');
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

// Mobile menu functionality
const mobileMenuButton = document.querySelector('[aria-label="Toggle menu"]');
const mobileNav = document.querySelector('.mobile-nav');

if (mobileMenuButton && mobileNav) {
    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('active');
    });
}

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
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        // Show success message
        showNotification('Thank you for subscribing!', 'success');
        
        // Clear form
        newsletterForm.reset();
    });
}

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

// Product Grid Keyboard Navigation
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    const products = Array.from(productGrid.querySelectorAll('.product-card'));
    let currentIndex = 0;

    productGrid.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                currentIndex = (currentIndex + 1) % products.length;
                products[currentIndex].focus();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                currentIndex = (currentIndex - 1 + products.length) % products.length;
                products[currentIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                currentIndex = (currentIndex - 4 + products.length) % products.length;
                products[currentIndex].focus();
                break;
            case 'ArrowDown':
                e.preventDefault();
                currentIndex = (currentIndex + 4) % products.length;
                products[currentIndex].focus();
                break;
        }
    });

    // Make product cards focusable
    products.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', () => {
            const link = card.querySelector('a');
            if (link) link.click();
        });
    });
});

// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    const miniCart = document.querySelector('.mini-cart');
    const closeCartBtn = document.querySelector('.close-cart');
    
    // Toggle mini cart
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        miniCart.classList.toggle('show');
    });
    
    // Close mini cart when clicking outside
    document.addEventListener('click', function(e) {
        if (!miniCart.contains(e.target) && !cartIcon.contains(e.target)) {
            miniCart.classList.remove('show');
        }
    });
    
    // Close mini cart with close button
    closeCartBtn.addEventListener('click', function() {
        miniCart.classList.remove('show');
    });
    
    // Handle Snipcart events
    document.addEventListener('snipcart.ready', function() {
        // Update cart count when items are added/removed
        Snipcart.subscribe('cart.ready', function() {
            updateCartCount();
        });
        
        Snipcart.subscribe('item.added', function() {
            updateCartCount();
            miniCart.classList.add('show');
        });
        
        Snipcart.subscribe('item.removed', function() {
            updateCartCount();
        });
    });
});

// Update cart count
function updateCartCount() {
    const count = Snipcart.api.items.count();
    const countElement = document.querySelector('.snipcart-items-count');
    countElement.textContent = count;
    
    if (count > 0) {
        countElement.style.display = 'flex';
    } else {
        countElement.style.display = 'none';
    }
}

// Product template
function createProductCard(product) {
    const template = document.querySelector('#product-template');
    const clone = template.content.cloneNode(true);
    
    // Set product details
    clone.querySelector('.product-image').src = product.image;
    clone.querySelector('.product-title').textContent = product.title;
    clone.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
    
    // Set Snipcart data attributes
    const addToCartBtn = clone.querySelector('.snipcart-add-item');
    addToCartBtn.setAttribute('data-item-id', product.id);
    addToCartBtn.setAttribute('data-item-price', product.price);
    addToCartBtn.setAttribute('data-item-description', product.description);
    addToCartBtn.setAttribute('data-item-image', product.image);
    
    return clone;
}

// Example products data
const products = [
    {
        id: 'product-1',
        title: 'Product 1',
        price: 29.99,
        description: 'This is product 1 description',
        image: 'path/to/image1.jpg'
    },
    // Add more products as needed
];

// Render products
function renderProducts() {
    const productsContainer = document.querySelector('.products-grid');
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
}); 