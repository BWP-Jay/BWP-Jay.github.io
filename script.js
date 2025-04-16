// Snipcart event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();
    
    // Mini cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    const miniCart = document.querySelector('.mini-cart');
    const viewCartBtn = document.querySelector('.view-cart-btn');
    
    if (cartIcon && miniCart) {
        cartIcon.addEventListener('mouseenter', () => {
            miniCart.classList.remove('hidden');
        });
        
        cartIcon.addEventListener('mouseleave', (e) => {
            if (!e.relatedTarget?.closest('.mini-cart')) {
                miniCart.classList.add('hidden');
            }
        });
        
        miniCart.addEventListener('mouseleave', () => {
            miniCart.classList.add('hidden');
        });
        
        if (viewCartBtn) {
            viewCartBtn.addEventListener('click', () => {
                Snipcart.api.cart.open();
            });
        }
    }
    
    // Listen for Snipcart events
    document.addEventListener('snipcart.ready', function() {
        console.log('Snipcart is ready');
        updateCartCount();
        updateMiniCart();
    });
    
    document.addEventListener('snipcart.cart.open', function() {
        console.log('Cart opened');
    });
    
    document.addEventListener('snipcart.cart.close', function() {
        console.log('Cart closed');
    });
    
    document.addEventListener('snipcart.cart.item.added', function(event) {
        const item = event.detail.item;
        updateCartCount();
        updateMiniCart();
        showNotification(`${item.name} added to cart`, 'success');
    });
    
    document.addEventListener('snipcart.cart.item.removed', function(event) {
        const item = event.detail.item;
        updateCartCount();
        updateMiniCart();
        showNotification(`${item.name} removed from cart`, 'info');
    });
    
    document.addEventListener('snipcart.cart.item.updated', function(event) {
        const item = event.detail.item;
        updateCartCount();
        updateMiniCart();
        showNotification(`${item.name} quantity updated`, 'info');
    });
    
    document.addEventListener('snipcart.checkout.completed', function(event) {
        const order = event.detail.order;
        updateCartCount();
        updateMiniCart();
        showNotification('Thank you for your order!', 'success');
    });
});

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount && Snipcart.api) {
        const count = Snipcart.api.cart.items().length;
        cartCount.textContent = count;
        cartCount.setAttribute('aria-label', `${count} items in cart`);
    }
}

// Update mini cart
function updateMiniCart() {
    const miniCartItems = document.querySelector('.mini-cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    if (miniCartItems && cartTotal && Snipcart.api) {
        const items = Snipcart.api.cart.items();
        const total = Snipcart.api.cart.total();
        
        if (items.length === 0) {
            miniCartItems.innerHTML = '<p class="text-gray-500 text-center">Your cart is empty</p>';
        } else {
            miniCartItems.innerHTML = items.map(item => `
                <div class="flex items-center space-x-3 mb-3">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                    <div class="flex-1">
                        <h4 class="text-sm font-medium">${item.name}</h4>
                        <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
                        <p class="text-xs font-medium">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
            `).join('');
        }
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

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