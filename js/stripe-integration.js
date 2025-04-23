// Stripe Integration
class StripePayment {
    constructor() {
        // Replace with your Stripe publishable key
        this.stripePublicKey = 'pk_live_your_publishable_key';
        this.stripe = null;
        this.init();
    }

    init() {
        // Load Stripe.js
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.async = true;
        script.onload = () => {
            this.stripe = Stripe(this.stripePublicKey);
            console.log('Stripe loaded successfully');
        };
        document.head.appendChild(script);
    }

    async createCheckoutSession(items) {
        try {
            // Show loading state
            const checkoutBtn = document.querySelector('.checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.disabled = true;
                checkoutBtn.textContent = 'Processing...';
            }

            // Call your server to create a checkout session
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            });

            const session = await response.json();

            if (session.error) {
                throw new Error(session.error);
            }

            // Redirect to Stripe Checkout
            const result = await this.stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            return { success: true, sessionId: session.id };
        } catch (error) {
            console.error('Error creating checkout session:', error);
            // Reset checkout button
            const checkoutBtn = document.querySelector('.checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.disabled = false;
                checkoutBtn.textContent = 'Checkout';
            }
            return { success: false, error };
        }
    }

    redirectToCheckout(sessionId) {
        // In a real implementation, this would redirect to Stripe Checkout
        // For this example, we'll simulate a successful payment
        
        // Show loading state
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
            checkoutBtn.textContent = 'Processing...';
        }
        
        // Simulate processing time
        setTimeout(() => {
            // Simulate successful payment
            this.handleSuccessfulPayment();
        }, 2000);
    }

    handleSuccessfulPayment() {
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-full opacity-0 transition-all duration-300';
        notification.textContent = 'Payment successful! Thank you for your purchase.';
        
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
        
        // Reset checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Checkout';
        }
        
        // Clear the cart
        if (window.cart) {
            window.cart.items = [];
            window.cart.saveCart();
            window.cart.updateCartCount();
            window.cart.renderCart();
            window.cart.closeCart();
        }
    }
}

// Initialize Stripe payment
const stripePayment = new StripePayment();

// Make available globally
window.stripePayment = stripePayment; 