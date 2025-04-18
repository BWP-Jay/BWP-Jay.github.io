// Cart functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateTotal();
        this.init();
    }

    init() {
        // Create cart sidebar if it doesn't exist
        if (!document.getElementById('cart-sidebar')) {
            this.createCartSidebar();
        }
        
        // Update cart count
        this.updateCartCount();
        
        // Add event listeners
        document.addEventListener('DOMContentLoaded', () => {
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.addEventListener('click', () => this.toggleCart());
            }
            
            // Add event listener for checkout button
            setTimeout(() => {
                const checkoutBtn = document.querySelector('.checkout-btn');
                if (checkoutBtn) {
                    checkoutBtn.addEventListener('click', () => this.checkout());
                }
            }, 500);
        });
    }

    createCartSidebar() {
        const sidebar = document.createElement('div');
        sidebar.id = 'cart-sidebar';
        sidebar.className = 'fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out z-50';
        
        sidebar.innerHTML = `
            <div class="p-4 h-full flex flex-col">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-primary">Shopping Cart</h2>
                    <button class="close-cart text-gray-500 hover:text-gray-700" aria-label="Close cart">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cart-items flex-grow overflow-y-auto">
                    <!-- Cart items will be inserted here -->
                </div>
                <div class="cart-summary border-t pt-4">
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Subtotal:</span>
                        <span class="cart-total">$0.00</span>
                    </div>
                    <button class="checkout-btn w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300">
                        Checkout
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(sidebar);
        
        // Add event listeners for the sidebar
        const closeBtn = sidebar.querySelector('.close-cart');
        closeBtn.addEventListener('click', () => this.toggleCart());
        
        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !e.target.closest('.cart-icon')) {
                this.closeCart();
            }
        });
    }

    toggleCart() {
        const sidebar = document.getElementById('cart-sidebar');
        if (sidebar.classList.contains('translate-x-full')) {
            this.openCart();
        } else {
            this.closeCart();
        }
    }

    openCart() {
        const sidebar = document.getElementById('cart-sidebar');
        sidebar.classList.remove('translate-x-full');
        this.renderCart();
    }

    closeCart() {
        const sidebar = document.getElementById('cart-sidebar');
        sidebar.classList.add('translate-x-full');
    }

    addItem(product) {
        const existingItem = this.items.find(item => 
            item.name === product.name && 
            item.size === product.size && 
            (!product.color || item.color === product.color)
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.renderCart();
        this.showNotification('Item added to cart');
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
        this.showNotification('Item removed from cart');
    }

    updateQuantity(index, change) {
        const item = this.items[index];
        item.quantity = Math.max(1, item.quantity + change);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0
        );
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.setAttribute('aria-label', `${count} items in cart`);
        }
    }

    renderCart() {
        const cartItems = document.querySelector('.cart-items');
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    Your cart is empty
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.items.map((item, index) => `
            <div class="cart-item flex items-center gap-4 p-4 border-b">
                <div class="flex-grow">
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-sm text-gray-600">
                        ${item.size}${item.color ? ` - ${item.color}` : ''}
                    </p>
                    <p class="text-accent">$${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button class="quantity-btn" onclick="cart.updateQuantity(${index}, -1)" aria-label="Decrease quantity">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="cart.updateQuantity(${index}, 1)" aria-label="Increase quantity">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-btn text-red-500 hover:text-red-700" onclick="cart.removeItem(${index})" aria-label="Remove item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        this.updateTotal();
        const totalElement = document.querySelector('.cart-total');
        if (totalElement) {
            totalElement.textContent = `$${this.total.toFixed(2)}`;
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-full opacity-0 transition-all duration-300';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.remove('translate-y-full', 'opacity-0');
        }, 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-y-full', 'opacity-0');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    checkout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty');
            return;
        }
        
        // Use Stripe for checkout if available
        if (window.stripePayment) {
            window.stripePayment.createCheckoutSession(this.items);
        } else {
            // Fallback to simulated checkout if Stripe is not available
            console.log('Processing checkout with items:', this.items);
            console.log('Total amount:', this.total);
            
            // Simulate a successful checkout
            this.showNotification('Order placed successfully!');
            
            // Clear the cart
            this.items = [];
            this.saveCart();
            this.updateCartCount();
            this.renderCart();
            
            // Close the cart sidebar
            this.closeCart();
        }
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Make cart available globally
window.cart = cart; 