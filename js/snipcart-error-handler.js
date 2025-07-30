// Snipcart Error Handler
class SnipcartErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        // Listen for Snipcart errors
        document.addEventListener('snipcart.error', (event) => {
            this.handleError(event.detail);
        });

        // Listen for checkout errors specifically
        document.addEventListener('snipcart.checkout.error', (event) => {
            this.handleCheckoutError(event.detail);
        });
    }

    handleError(error) {
        console.log('Snipcart error:', error);
        
        // Check if it's a price change error
        if (error.message && error.message.includes('Price of products in the cart may have changed')) {
            this.showPriceChangeError();
        } else {
            this.showGenericError(error);
        }
    }

    handleCheckoutError(error) {
        console.log('Checkout error:', error);
        
        // Show custom error message
        this.showCheckoutError(error);
    }

    showPriceChangeError() {
        const errorMessage = `
            <div class="snipcart-error-container" style="
                background-color: #fef2f2;
                border: 1px solid #fecaca;
                border-radius: 8px;
                padding: 16px;
                margin: 16px 0;
                color: #991b1b;
                font-size: 14px;
                line-height: 1.5;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 8px; color: #dc2626;"></i>
                    <strong>Price Update Required</strong>
                </div>
                <p style="margin-bottom: 12px;">
                    The prices of some items in your cart have been updated. To continue with your purchase, please refresh your cart.
                </p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button onclick="this.refreshCart()" style="
                        background-color: #1a472a;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 13px;
                        font-weight: 500;
                    ">
                        <i class="fas fa-sync-alt" style="margin-right: 6px;"></i>
                        Refresh Cart
                    </button>
                    <button onclick="this.clearCart()" style="
                        background-color: #6b7280;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 13px;
                        font-weight: 500;
                    ">
                        <i class="fas fa-trash" style="margin-right: 6px;"></i>
                        Clear Cart
                    </button>
                </div>
            </div>
        `;

        // Insert the error message into the Snipcart modal
        this.insertErrorIntoSnipcart(errorMessage);
    }

    showGenericError(error) {
        const errorMessage = `
            <div class="snipcart-error-container" style="
                background-color: #fef2f2;
                border: 1px solid #fecaca;
                border-radius: 8px;
                padding: 16px;
                margin: 16px 0;
                color: #991b1b;
                font-size: 14px;
                line-height: 1.5;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <i class="fas fa-exclamation-circle" style="margin-right: 8px; color: #dc2626;"></i>
                    <strong>Something went wrong</strong>
                </div>
                <p style="margin-bottom: 12px;">
                    We encountered an issue processing your request. Please try again or contact support if the problem persists.
                </p>
                <button onclick="this.retryAction()" style="
                    background-color: #1a472a;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 500;
                ">
                    <i class="fas fa-redo" style="margin-right: 6px;"></i>
                    Try Again
                </button>
            </div>
        `;

        this.insertErrorIntoSnipcart(errorMessage);
    }

    showCheckoutError(error) {
        const errorMessage = `
            <div class="snipcart-error-container" style="
                background-color: #fef2f2;
                border: 1px solid #fecaca;
                border-radius: 8px;
                padding: 16px;
                margin: 16px 0;
                color: #991b1b;
                font-size: 14px;
                line-height: 1.5;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <i class="fas fa-credit-card" style="margin-right: 8px; color: #dc2626;"></i>
                    <strong>Checkout Error</strong>
                </div>
                <p style="margin-bottom: 12px;">
                    There was an issue processing your payment. Please check your payment information and try again.
                </p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button onclick="this.retryCheckout()" style="
                        background-color: #1a472a;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 13px;
                        font-weight: 500;
                    ">
                        <i class="fas fa-redo" style="margin-right: 6px;"></i>
                        Try Again
                    </button>
                    <button onclick="this.contactSupport()" style="
                        background-color: #6b7280;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 13px;
                        font-weight: 500;
                    ">
                        <i class="fas fa-headset" style="margin-right: 6px;"></i>
                        Contact Support
                    </button>
                </div>
            </div>
        `;

        this.insertErrorIntoSnipcart(errorMessage);
    }

    insertErrorIntoSnipcart(errorHtml) {
        // Wait for Snipcart modal to be ready
        setTimeout(() => {
            const snipcartModal = document.querySelector('.snipcart-modal__container');
            if (snipcartModal) {
                // Remove any existing error containers
                const existingErrors = snipcartModal.querySelectorAll('.snipcart-error-container');
                existingErrors.forEach(error => error.remove());

                // Insert the error message at the top of the modal
                const modalContent = snipcartModal.querySelector('.snipcart-modal__content');
                if (modalContent) {
                    modalContent.insertAdjacentHTML('afterbegin', errorHtml);
                }
            }
        }, 100);
    }

    // Error recovery methods
    refreshCart() {
        if (window.Snipcart) {
            // Clear the cart and redirect to products page
            window.Snipcart.api.cart.clear();
            window.location.href = '/all-products.html';
        }
    }

    clearCart() {
        if (window.Snipcart) {
            window.Snipcart.api.cart.clear();
            window.Snipcart.api.modal.close();
        }
    }

    retryAction() {
        // Reload the page to retry
        window.location.reload();
    }

    retryCheckout() {
        if (window.Snipcart) {
            // Close current modal and reopen checkout
            window.Snipcart.api.modal.close();
            setTimeout(() => {
                window.Snipcart.api.cart.open();
            }, 500);
        }
    }

    contactSupport() {
        // Open contact page or email
        window.open('mailto:support@backwaterpursuits.com?subject=Checkout%20Error', '_blank');
    }
}

// Initialize error handler
const errorHandler = new SnipcartErrorHandler(); 