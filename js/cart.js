// Cart functionality for Snipcart integration
class ShoppingCart {
    constructor() {
        this.init();
    }

    init() {
        // Update cart count when Snipcart updates
        document.addEventListener('snipcart.ready', () => {
            this.updateCartCount();
        });

        document.addEventListener('snipcart.change', () => {
            this.updateCartCount();
        });
    }

    updateCartCount() {
        const count = window.Snipcart.store.getState().cart.items.length;
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.setAttribute('aria-label', `${count} items in cart`);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-full transition-transform duration-300';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.remove('translate-y-full');
        }, 100);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-y-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart(); 