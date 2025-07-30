// Cart Utility Functions
class CartUtils {
    constructor() {
        this.init();
    }

    init() {
        // Add refresh cart button to navigation if needed
        this.addRefreshCartButton();
        
        // Listen for cart errors
        document.addEventListener('snipcart.error', (event) => {
            if (event.detail.message && event.detail.message.includes('Price of products in the cart may have changed')) {
                this.showRefreshCartPrompt();
            }
        });
    }

    addRefreshCartButton() {
        // Add a refresh cart button to the navigation
        const cartButton = document.querySelector('.snipcart-checkout');
        if (cartButton) {
            const refreshButton = document.createElement('button');
            refreshButton.className = 'ml-2 text-accent hover:text-white transition-colors duration-300';
            refreshButton.innerHTML = '<i class="fas fa-sync-alt text-sm"></i>';
            refreshButton.setAttribute('aria-label', 'Refresh cart');
            refreshButton.title = 'Refresh cart';
            refreshButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.refreshCart();
            });
            
            cartButton.parentNode.insertBefore(refreshButton, cartButton.nextSibling);
        }
    }

    showRefreshCartPrompt() {
        const prompt = `
            <div class="refresh-cart-prompt" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 2px solid #1a472a;
                border-radius: 8px;
                padding: 24px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                max-width: 400px;
                text-align: center;
            ">
                <div style="margin-bottom: 16px;">
                    <i class="fas fa-exclamation-triangle" style="color: #f59e0b; font-size: 24px;"></i>
                </div>
                <h3 style="color: #1a472a; font-size: 18px; font-weight: bold; margin-bottom: 12px;">
                    Cart Update Required
                </h3>
                <p style="color: #666; margin-bottom: 20px; line-height: 1.5;">
                    The prices in your cart have been updated. Would you like to refresh your cart with the current prices?
                </p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button onclick="cartUtils.refreshCart()" style="
                        background-color: #1a472a;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: 500;
                    ">
                        Refresh Cart
                    </button>
                    <button onclick="cartUtils.closePrompt()" style="
                        background-color: #6b7280;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: 500;
                    ">
                        Cancel
                    </button>
                </div>
            </div>
        `;

        // Remove any existing prompts
        const existingPrompt = document.querySelector('.refresh-cart-prompt');
        if (existingPrompt) {
            existingPrompt.remove();
        }

        // Add the prompt
        document.body.insertAdjacentHTML('beforeend', prompt);
    }

    closePrompt() {
        const prompt = document.querySelector('.refresh-cart-prompt');
        if (prompt) {
            prompt.remove();
        }
    }

    refreshCart() {
        if (window.Snipcart) {
            // Clear the cart
            window.Snipcart.api.cart.clear();
            
            // Close any open modals
            window.Snipcart.api.modal.close();
            
            // Show success message
            this.showNotification('Cart refreshed successfully! You can now add items with current prices.', 'success');
            
            // Close the prompt
            this.closePrompt();
            
            // Redirect to products page after a short delay
            setTimeout(() => {
                window.location.href = '/all-products.html';
            }, 2000);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform translate-y-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.remove('translate-y-full');
        }, 100);

        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.classList.add('translate-y-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Method to check if cart has stale items
    checkForStaleItems() {
        if (!window.Snipcart) return false;

        const cart = window.Snipcart.store.getState().cart;
        const currentTime = Date.now();
        const staleThreshold = 30 * 60 * 1000; // 30 minutes

        // Check if cart was last updated more than 30 minutes ago
        if (cart.lastUpdated && (currentTime - cart.lastUpdated) > staleThreshold) {
            return true;
        }

        return false;
    }

    // Method to automatically refresh cart if stale
    autoRefreshIfStale() {
        if (this.checkForStaleItems()) {
            this.showRefreshCartPrompt();
        }
    }
}

// Initialize cart utils
const cartUtils = new CartUtils();

// Auto-check for stale cart when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        cartUtils.autoRefreshIfStale();
    }, 2000);
}); 