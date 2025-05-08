// Snipcart wrapper for consistent cart functionality
class CartManager {
    constructor() {
        this.init();
    }

    init() {
        // Wait for Snipcart to be ready
        document.addEventListener('snipcart.ready', () => {
            console.log('Snipcart is ready');
            this.updateCartCount();
        });
        
        // Listen for cart events
        document.addEventListener('snipcart.cart.item.added', () => {
            this.updateCartCount();
            this.showNotification('Item added to cart', 'success');
        });
        
        document.addEventListener('snipcart.cart.item.removed', () => {
            this.updateCartCount();
            this.showNotification('Item removed from cart', 'info');
        });
        
        // Add event listeners for cart icon
        document.addEventListener('DOMContentLoaded', () => {
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.addEventListener('click', () => this.openCart());
            }
        });
    }
    
    updateCartCount() {
        if (typeof Snipcart !== 'undefined') {
            const cartCount = document.querySelector('.snipcart-items-count');
            if (cartCount) {
                cartCount.textContent = Snipcart.api.cart.items().length;
            }
        }
    }
    
    openCart() {
        if (typeof Snipcart !== 'undefined') {
            Snipcart.api.cart.open();
        }
    }
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform translate-y-full opacity-0 transition-all duration-300 ${
            type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        } text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.remove('translate-y-full', 'opacity-0');
        }, 100);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-y-full', 'opacity-0');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Initialize cart manager
const cartManager = new CartManager(); 